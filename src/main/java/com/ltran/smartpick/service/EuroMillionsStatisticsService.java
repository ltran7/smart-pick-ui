package com.ltran.smartpick.service;

import com.ltran.smartpick.persistence.repository.EuroMillionsStatisticsRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;

import javax.inject.Named;

import static com.ltran.smartpick.service.util.EuroMillionsStatisticsUtil.extractEuroMillionsStatistics;

@Named
public class EuroMillionsStatisticsService {

    @Autowired
    private EuroMillionsStatisticsRepository euroMillionsStatisticsRepository;

    @Value("${euro-millions.statistics.url}")
    private String euroMillionsStatisticsUrl;

    @Scheduled(cron = "59 59 23 ? * Tue,Fri", zone = "Europe/Brussels")
    public void updateEuroMillionsStatistics() {
        try {
            final Document doc = Jsoup.connect(euroMillionsStatisticsUrl).get();
            euroMillionsStatisticsRepository.saveAll(extractEuroMillionsStatistics(doc));
        } catch (Exception ex) {
            System.out.println("An unexpected error occurred while updating the euroMillions statistics: " +
                    ex.getMessage());
        }
    }

}
