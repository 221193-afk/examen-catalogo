package com.example.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.model.Category;
import com.example.backend.repository.CategoryRepository;

@Service
public class CategoryService {

    private final CategoryRepository repo;

    public CategoryService(CategoryRepository repo) {
        this.repo = repo;
    }

    public List<Category> getAll() {
        return repo.findAll();
    }
}
