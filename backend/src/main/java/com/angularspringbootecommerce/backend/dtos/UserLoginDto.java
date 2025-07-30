package com.angularspringbootecommerce.backend.dtos;

import com.angularspringbootecommerce.backend.models.User;
import com.angularspringbootecommerce.backend.models.UserRole;
import lombok.Getter;

import java.util.Set;

@Getter
public class UserLoginDto {

    private Long id;
    private User user;
    private String jwt;
    private Set<UserRole> authorities;
    public UserLoginDto() {
        super();
    }

    public UserLoginDto(Long id, User user, String jwt,Set<UserRole> authorities) {
        this.id = id;
        this.user = user;
        this.jwt = jwt;
        this.authorities = authorities;
    }

    public void setId(Long id) {
        this.id = id;
    }
}