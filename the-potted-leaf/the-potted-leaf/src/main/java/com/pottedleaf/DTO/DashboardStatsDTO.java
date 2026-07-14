package com.pottedleaf.DTO;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class DashboardStatsDTO {

    private Long totalUsers;

    private Long totalPlants;

    private Long totalOrders;

    private BigDecimal totalRevenue;

    private Long paidOrders;

    private Long processingOrders;

    private Long shippedOrders;

    private Long deliveredOrders;

    private Long cancelledOrders;
}
