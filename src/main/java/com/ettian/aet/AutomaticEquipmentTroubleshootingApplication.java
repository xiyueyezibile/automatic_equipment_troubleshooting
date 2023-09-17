package com.ettian.aet;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @Author ETtian
 * @Description TODO
 * @Date 2023/9/16 22:54
 * @Version 1.0
 */
@SpringBootApplication
@MapperScan("com.ettian.aet.mapper")
public class AutomaticEquipmentTroubleshootingApplication {
    public static void main(String[] args) {
        SpringApplication.run(AutomaticEquipmentTroubleshootingApplication.class, args);
    }
}
