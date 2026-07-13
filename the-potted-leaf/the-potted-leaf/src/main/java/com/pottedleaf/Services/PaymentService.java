package com.pottedleaf.Services;

import com.pottedleaf.Entities.Cart;
import com.pottedleaf.Entities.CartItem;
import com.pottedleaf.Entities.Plant;
import com.pottedleaf.Repositories.AddressRepository;
import com.pottedleaf.Repositories.CartItemRepository;
import com.pottedleaf.Repositories.CartRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PlantService plantService;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final AddressRepository addressRepository;

    public String createCheckoutSession(Long plantId, Long userId, String size,String color,String material,Integer quantity,Long addressId) throws StripeException{
        Plant plant = plantService.getPlantById(plantId);
        if(plant == null){
            throw new RuntimeException("Plant not found");
        }

        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}")
                .setCancelUrl("http://localhost:5173/payment-cancel")
                .putMetadata("plantId",plantId.toString())
                .putMetadata("userId",userId.toString())
                .putMetadata("size", size)
                .putMetadata("color", color)
                .putMetadata("material", material)
                .putMetadata("quantity",String.valueOf(quantity))
                .putMetadata("addressId",String.valueOf(addressId))
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setQuantity(1L)
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency("inr")
                                                .setUnitAmount(
                                                        plant.getPrice()
                                                                .multiply(BigDecimal.valueOf(100))
                                                                .longValue()
                                                )
                                                .setProductData(
                                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                .setName(plant.getName())
                                                                .build()
                                                )
                                                .build()
                                ).build()
                ).build();
        Session session = Session.create(params);

        return session.getUrl();
    }

    public String createCartCheckoutSession(Long userId, Long addressId) throws StripeException {
        Cart cart = cartRepository.findByUserId(userId).orElseThrow();

        List<CartItem> items = cartItemRepository.findByCart(cart);
        for(CartItem item : items){
            Plant plant = item.getPlant();
            if(plant.getStockQuantity() < item.getQuantity()){
                throw new RuntimeException(plant.getName() + " has only " + plant.getStockQuantity() + " left ");
            }
        }
        BigDecimal total = items.stream()
                .map(item ->
                        item.getPlant()
                            .getPrice()
                            .multiply(
                                    BigDecimal.valueOf(
                                            item.getQuantity()
                                    )
                            )
                )
                .reduce(BigDecimal.ZERO,
                        BigDecimal::add
                );
        SessionCreateParams params =
                SessionCreateParams.builder()
                        .setMode(
                                SessionCreateParams.Mode.PAYMENT
                        )

                        .setSuccessUrl("http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}")
                        .setCancelUrl("http://localhost:5173/payment-cancel")
                        .putMetadata(
                                "checkoutType",
                                "CART"
                        )
                        .putMetadata(
                                "userId",
                                String.valueOf(userId)
                        )
                        .putMetadata(
                                "addressId",
                                String.valueOf(addressId)
                        )

                        .addLineItem(
                                SessionCreateParams.LineItem
                                        .builder()
                                        .setQuantity(1L)
                                        .setPriceData(
                                                SessionCreateParams
                                                        .LineItem
                                                        .PriceData
                                                        .builder()
                                                        .setCurrency("inr")
                                                        .setUnitAmount(
                                                                total
                                                                        .multiply(
                                                                                BigDecimal.valueOf(100)
                                                                        )
                                                                        .longValue()
                                                        )
                                                        .setProductData(
                                                                SessionCreateParams
                                                                        .LineItem
                                                                        .PriceData
                                                                        .ProductData
                                                                        .builder()
                                                                        .setName("Cart Checkout")
                                                                        .build()
                                                        )
                                                        .build()
                                        )
                                        .build()
                        )
                        .build();
        Session session = Session.create(params);
        return session.getUrl();
    }
}
