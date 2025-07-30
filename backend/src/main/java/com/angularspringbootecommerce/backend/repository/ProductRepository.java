package com.angularspringbootecommerce.backend.repository;

import com.angularspringbootecommerce.backend.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT count(*) from Product p where p.productType=:productType")
    public long countByProductType(@Param("productType") String productType);

}
