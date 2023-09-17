package com.ettian.aet.mapper;

import com.ettian.aet.entity.EquipmentFailure;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author ETtian
 * @since 2023-09-16
 */
public interface EquipmentFailureMapper extends BaseMapper<EquipmentFailure> {

    @Select("SELECT workshop_number, COUNT(*) AS failure_count FROM aet_equipment_failure " +
            "WHERE #{date} IS NULL OR occurrence_time >= #{date} " +
            "GROUP BY workshop_number")
    List<Map<String, Object>> countFailuresByWorkshop(@Param("date") Date date);

    @Select("SELECT failure_type, COUNT(*) AS failure_count " +
            "FROM aet_equipment_failure " +
            "WHERE #{date} IS NULL OR occurrence_time >= #{date} " +
            "GROUP BY failure_type")
    List<Map<String, Object>> countFailuresByType(@Param("date") Date date);

    @Select("SELECT failure_type, COUNT(*) AS failure_count " +
            "FROM aet_equipment_failure " +
            "WHERE workshop_number = #{workshopNumber} " +
            "AND (#{date} IS NULL OR occurrence_time >= #{date}) " +
            "GROUP BY failure_type")
    List<Map<String, Object>> countFailuresByTypeAndWorkshop(@Param("workshopNumber") Integer workshopNumber, @Param("date") Date date);


    @Select("SELECT DATE_FORMAT(occurrence_time, '%Y-%m') AS month, COUNT(*) AS failure_count " +
            "FROM aet_equipment_failure " +
            "WHERE (#{workshopNumber} IS NULL OR workshop_number = #{workshopNumber}) " +
            "GROUP BY month")
    List<Map<String, Object>> countFactoryFailuresByMonth(@Param("workshopNumber") Integer workshopNumber);
}
