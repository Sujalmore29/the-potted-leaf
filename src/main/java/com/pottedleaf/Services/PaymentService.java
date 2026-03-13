package com.pottedleaf.Services;

import com.pottedleaf.Entities.Plant;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PlantService plantService;

    public String createCheckoutSession(Long plantId, Long userId) throws StripeException{
        Plant plant = plantService.getPlantById(plantId);
        if(plant == null){
            throw new RuntimeException("Plant not found");
        }

        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:5173/success")
                .setCancelUrl("http://localhost:5173/cancel")
                .putMetadata("plantId",plantId.toString())
                .putMetadata("userId",userId.toString())
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
}
