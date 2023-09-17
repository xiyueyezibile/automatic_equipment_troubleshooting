package com.ettian.aet.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.api.R;
import com.ettian.aet.entity.EquipmentFailure;
import com.ettian.aet.service.EquipmentFailureService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 车间故障
 * @author ETtian
 * @since 2023-09-16
 */
@Api(description = "车间故障")
@Slf4j
@RestController
@RequestMapping("/aet/equipment-failure")
@CrossOrigin
public class EquipmentFailureController {

    private final EquipmentFailureService equipmentFailureService;

    public EquipmentFailureController(EquipmentFailureService equipmentFailureService) {
        this.equipmentFailureService = equipmentFailureService;
    }

    @ApiOperation("故障发生总次数")
    @GetMapping("total")
    public R total(@RequestParam(name = "workshopNumber", required = false) Integer workshopNumber) {
        QueryWrapper<EquipmentFailure> wrapper = null;
        if (workshopNumber != null) {
            wrapper = new QueryWrapper<>();
            wrapper.eq("equipment_number",workshopNumber);
        }
        int count = equipmentFailureService.count(wrapper);
        log.info("count: "+count);
        Map<String, Integer> res = new HashMap<>();
        res.put("count",count);
        return R.ok(res);
    }

    @ApiOperation("不同车间发生的故障次数")
    @GetMapping("allDifferentWorkShopTotal")
    public R differentWorkTotal(@RequestParam(name = "date", required = false) Date date){
        return R.ok(equipmentFailureService.countFailuresByWorkshop(date));
    }

    @ApiOperation("不同类型故障发生的次数")
    @GetMapping("/type-count")
    public R getTypeFailureCount(@RequestParam(name = "date", required = false) Date date) {
        return R.ok(equipmentFailureService.countFailuresByType(date));
    }

    @ApiOperation("通过车间编号workshop_number得到某车间不同类型故障发生的次数")
    @GetMapping("/workshop-type-count")
    public List<Map<String, Object>> getWorkshopTypeFailureCount(
            @RequestParam(name = "workshopNumber") Integer workshopNumber,
            @RequestParam(name = "date", required = false) Date date) {
        return equipmentFailureService.countFailuresByTypeAndWorkshop(workshopNumber, date);
    }

    @ApiOperation("各月发生故障的次数,可以允许传入车间编号workshop_number参数，若传入workshop_number则功能变为实现该车间各月发生故障的次数")
    @GetMapping("/factory-month-count")
    public List<Map<String, Object>> getFactoryMonthFailureCount(
            @RequestParam(name = "workshopNumber", required = false) Integer workshopNumber) {
        return equipmentFailureService.countFactoryFailuresByMonth(workshopNumber);
    }

    @ApiOperation("各位置上发生故障的次数")
    @GetMapping("/position-fail-count")
    public Map<String,Integer> getPositionFailCount(
            @RequestParam(name = "workshopNumber", required = false) Integer workshopNumber) {
        List<EquipmentFailure> list = equipmentFailureService.list(null);
        Map<String,Integer> res = new HashMap<>();
        for (EquipmentFailure item : list) {
            String temp = String.valueOf(('A'+item.getWorkshopNumber()));
            res.put("车间"+temp+"-"+item.getAssemblyLinePosition(),res.getOrDefault("车间"+temp+"-"+item.getAssemblyLinePosition(),0)+1);
        }
        return res;
    }


}

