package com.ettian.aet.service;

import com.baomidou.mybatisplus.extension.api.R;
import com.ettian.aet.entity.Equipment;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author ETtian
 * @since 2023-09-16
 */
public interface EquipmentService extends IService<Equipment> {

    R getDetails(Equipment equipment);
}
