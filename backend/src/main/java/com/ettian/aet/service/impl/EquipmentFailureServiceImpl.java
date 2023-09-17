package com.ettian.aet.service.impl;

import com.ettian.aet.entity.EquipmentFailure;
import com.ettian.aet.mapper.EquipmentFailureMapper;
import com.ettian.aet.service.EquipmentFailureService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author ETtian
 * @since 2023-09-16
 */
@Service
public class EquipmentFailureServiceImpl extends ServiceImpl<EquipmentFailureMapper, EquipmentFailure> implements EquipmentFailureService {


    public List<Map<String, Object>> countFailuresByWorkshop(Date date) {
        return baseMapper.countFailuresByWorkshop(date);
    }

    public List<Map<String, Object>> countFailuresByType(Date date) {
        return baseMapper.countFailuresByType(date);
    }

    public List<Map<String, Object>> countFailuresByTypeAndWorkshop(Integer workshopNumber, Date date) {
        return baseMapper.countFailuresByTypeAndWorkshop(workshopNumber, date);
    }

    public List<Map<String, Object>> countFactoryFailuresByMonth(Integer workshopNumber) {
        return baseMapper.countFactoryFailuresByMonth(workshopNumber);
    }
}
