package com.ettian.aet.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import java.util.Date;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 
 * </p>
 *
 * @author ETtian
 * @since 2023-09-16
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("aet_equipment")
@ApiModel(value="Equipment对象", description="")
public class Equipment implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "设备ID")
    @TableId(value = "id", type = IdType.ID_WORKER_STR)
    private String id;

    @ApiModelProperty(value = "设备编号")
    private String equipmentNumber;

    @ApiModelProperty(value = "所在车间编号")
    private Integer workshopNumber;

    @ApiModelProperty(value = "所在流水线位置")
    private Integer assemblyLinePosition;

    @ApiModelProperty(value = "购入时间")
    private Date purchaseDate;

    @ApiModelProperty(value = "厂家名称")
    private String manufacturerName;

    @ApiModelProperty(value = "厂家联系方式")
    private String manufacturerContact;

    @ApiModelProperty(value = "合同编号")
    private String contractNumber;

    @ApiModelProperty(value = "状态 0正常 1预警 2故障")
    private Integer equipmentState;

    @ApiModelProperty(value = "补充字段2")
    private String field2;

    @ApiModelProperty(value = "补充字段3")
    private String field3;

    @ApiModelProperty(value = "补充字段4")
    private String field4;

    @ApiModelProperty(value = "补充字段5")
    private String field5;

    @ApiModelProperty(value = "补充字段6")
    private String field6;

    @ApiModelProperty(value = "补充字段7")
    private String field7;

    @ApiModelProperty(value = "补充字段8")
    private String field8;

    @ApiModelProperty(value = "补充字段9")
    private String field9;

    @ApiModelProperty(value = "补充字段10")
    private String field10;

    @ApiModelProperty(value = "补充字段11")
    private String field11;

    @ApiModelProperty(value = "补充字段12")
    private String field12;

    @ApiModelProperty(value = "补充字段13")
    private String field13;

    @ApiModelProperty(value = "补充字段14")
    private String field14;

    @ApiModelProperty(value = "补充字段15")
    private String field15;


}
