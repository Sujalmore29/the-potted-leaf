package com.pottedleaf.Controller;

import com.pottedleaf.Services.OrderService;
import com.stripe.exception.EventDataObjectDeserializationException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class WebhookController {
    @Value("${stripe.webhook.secret}")
    private String webHookSecret;

    private final OrderService orderService;
    @PostMapping("/webhook")
    public ResponseEntity<String> handleStripeWebhook(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader) throws EventDataObjectDeserializationException {
        Event event;

        try {
            event = Webhook.constructEvent(
                    payload,
                    sigHeader,
                    webHookSecret
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();

        Session session = null;

        if (dataObjectDeserializer.getObject().isPresent()) {
            session = (Session) dataObjectDeserializer.getObject().get();
        } else {
            session = (Session) dataObjectDeserializer.deserializeUnsafe();
        }
        Long plantId = Long.parseLong(session.getMetadata().get("plantId"));
        Long userId = Long.parseLong(session.getMetadata().get("userId"));

        if(!orderService.existByPaymentId(session.getPaymentIntent())) {
            orderService.createOrderAfterPayment(userId, plantId, session.getPaymentIntent());
        }



        return ResponseEntity.ok("Success");
    }
}
