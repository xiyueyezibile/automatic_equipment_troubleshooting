package com.ettian.aet.service;

import com.ettian.aet.entity.EquipmentFailure;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author ETtian
 * @since 2023-09-16
 */
public interface EquipmentFailureService extends IService<EquipmentFailure> {

    List<Map<String, Object>> countFailuresByWorkshop(Date date);

    List<Map<String, Object>> countFailuresByType(Date date);

    List<Map<String, Object>> countFailuresByTypeAndWorkshop(Integer workshopNumber, Date date);

    List<Map<String, Object>> countFactoryFailuresByMonth(Integer workshopNumber);
}
