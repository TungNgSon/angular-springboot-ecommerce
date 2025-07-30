package com.angularspringbootecommerce.backend.job;

import com.angularspringbootecommerce.backend.repository.ProductRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ProductCountScheduler {
    private final ProductRepository productRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public ProductCountScheduler(ProductRepository productRepository, SimpMessagingTemplate messagingTemplate) {
        this.productRepository = productRepository;
        this.messagingTemplate = messagingTemplate;
    }

    @Scheduled(fixedRate = 5000)
    public void countProduct(){
        int totalCount = (int) productRepository.count();
        int userCount=(int)productRepository.countByProductType("user-product");
//        System.out.println("ADMIN COUNT: " + totalCount);
//        System.out.println("USER COUNT: " + userCount);
        messagingTemplate.convertAndSend("/topic/product-count/admin", totalCount);
        messagingTemplate.convertAndSend("/topic/product-count/user", userCount);

    }
}

