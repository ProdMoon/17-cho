package com.example.manmu;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Slf4j
@Configuration
@EnableWebSocketMessageBroker
public class WebsocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        System.out.println("regitser@@@@@@@@@@@@@@@@@@@@@");
        System.out.println("registry = " + registry);
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        System.out.println("configureMessageBroker@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        registry.setApplicationDestinationPrefixes("/app");
        registry.enableSimpleBroker("/topic");
        System.out.println("configureMessageBroker@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    }
}