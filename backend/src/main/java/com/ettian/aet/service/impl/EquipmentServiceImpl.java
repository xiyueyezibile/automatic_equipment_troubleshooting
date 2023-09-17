package com.ettian.aet.service.impl;

import com.baomidou.mybatisplus.extension.api.R;
import com.ettian.aet.entity.Equipment;
import com.ettian.aet.mapper.EquipmentMapper;
import com.ettian.aet.service.EquipmentService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ettian.aet.utils.BigModelNew;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.WebSocket;
import org.springframework.stereotype.Service;

import java.util.Scanner;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author ETtian
 * @since 2023-09-16
 */
@Service
public class EquipmentServiceImpl extends ServiceImpl<EquipmentMapper, Equipment> implements EquipmentService {

    @Override
    public R getDetails(Equipment equipment) {
        //可以替换成后续按我们给出的方案训练模型，最终替换这里
        //此处我们使用星火认知大模型对设备进行分析，给出结果。
        String[] sates = {"正常","预警","故障"};
        String filed2 = equipment.getField2();
        String answer = "该设备状态为"+sates[equipment.getEquipmentState()]+"，请根据设备给我描述一个要遇到的问题和解决发难。下面详细设备信息:"+filed2;
        boolean flag = true;
        while (true){
            if(BigModelNew.totalFlag){
                //Scanner scanner=new Scanner(System.in);
                System.out.print("我：");
                BigModelNew.totalFlag=false;

                if (flag) {
                    BigModelNew.NewQuestion = answer;
                    flag = false;
                }else {
                    break;
                }
                // 构建鉴权url
                String authUrl = null;
                try {
                    authUrl = BigModelNew.getAuthUrl(BigModelNew.hostUrl, BigModelNew.apiKey, BigModelNew.apiSecret);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                OkHttpClient client = new OkHttpClient.Builder().build();
                String url = authUrl.toString().replace("http://", "ws://").replace("https://", "wss://");
                Request request = new Request.Builder().url(url).build();
                for (int i = 0; i < 1; i++) {
                    BigModelNew.totalAnswer="";
                    WebSocket webSocket = client.newWebSocket(request, new BigModelNew(i + "",
                            false));
                }
            }else{
                try {
                    Thread.sleep(200);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }

        /*BigModelNew bigModelNew = new BigModelNew(equipment.getEquipmentNumber(), false);
        while (!bigModelNew.getWsCloseFlag()) {
            boolean flag = true;
            if (flag) {

                BigModelNew.NewQuestion = answer;
                String authUrl = null;
                try {
                    authUrl = BigModelNew.getAuthUrl(BigModelNew.hostUrl, BigModelNew.apiKey, BigModelNew.apiSecret);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                OkHttpClient client = new OkHttpClient.Builder().build();
                String url = authUrl.toString().replace("http://", "ws://").replace("https://", "wss://");
                Request request = new Request.Builder().url(url).build();
                WebSocket webSocket = client.newWebSocket(request, bigModelNew);

                flag = false;
            } else {
                try {
                    Thread.sleep(200);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }*/

        return R.ok(BigModelNew.totalAnswer);
    }
}
