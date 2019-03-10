package com.nestor.entity;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Data;

@Entity
@Table(name = "category")
@Data
public class Category {
	@Id
	@Column(name = "category_id")
	private String categoryId;
	@Column(name = "category_name", unique = true)
	private String categoryName;
	private String categoryDescription;
	private String categoryImagePath;
	private String categoryImageUrl;
	@CreationTimestamp
	private LocalDateTime createTime;
	@UpdateTimestamp
	private LocalDateTime updateTime;
	
	@ManyToMany(cascade = CascadeType.PERSIST)
	@JoinTable(name = "category_product", joinColumns = @JoinColumn(name = "category_id", referencedColumnName = "category_id")
	, inverseJoinColumns = @JoinColumn(name = "product_id", referencedColumnName = "product_id"))
	private List<Product> productList;
}
