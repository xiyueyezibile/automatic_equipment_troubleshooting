package com.ettian.aet.controller;


import com.baomidou.mybatisplus.extension.api.R;
import com.ettian.aet.entity.Equipment;
import com.ettian.aet.service.EquipmentFailureService;
import com.ettian.aet.service.EquipmentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author ETtian
 * @since 2023-09-16
 */
@Api(description = "车间设备信息")
@RestController
@RequestMapping("/aet/equipment")
public class EquipmentController {

    private final EquipmentService equipmentService;

    private final EquipmentFailureService equipmentFailureService;

    public EquipmentController(EquipmentFailureService equipmentFailureService, EquipmentService equipmentService) {
        this.equipmentFailureService = equipmentFailureService;
        this.equipmentService = equipmentService;
    }

    @ApiOperation("得到所有设备")
    @GetMapping("getEquipment")
    public List<Equipment> addEquipment(){

        return equipmentService.list(null);
    }

    @ApiOperation("预测详情")
    @PostMapping("getDetails")
    public R getDetails(@RequestBody Equipment equipment){
        //TODO 返回模型的预测结果及处理方案。此处只能模拟
        /*Map<String,String> map =  new HashMap<>();
        map.put("equipmentState", String.valueOf(equipment.getEquipmentState()));
        map.put("field2",equipment.getField2());
        return R.ok(map);*/
        return equipmentService.getDetails(equipment);
    }

}

