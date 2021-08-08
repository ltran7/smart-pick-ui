package com.ltran.smartpick.service;

import com.ltran.smartpick.model.Ball;
import com.ltran.smartpick.persistence.entity.EuroMillionsStatistics;
import com.ltran.smartpick.persistence.repository.EuroMillionsStatisticsRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.inject.Named;
import java.util.Collection;
import java.util.List;

import static com.ltran.smartpick.service.util.SmartPickGeneratorUtil.generateDraw;

@Named
public class SmartPickService {

    @Autowired
    private EuroMillionsStatisticsRepository euroMillionsStatisticsRepository;

    public Collection<Ball> draw(Collection<Ball> balls, int nbOfNumbers, int nbOfStars) {
        List<EuroMillionsStatistics> euroMillionsStatistics = euroMillionsStatisticsRepository.findAll();
        return generateDraw(balls, nbOfNumbers, nbOfStars, euroMillionsStatistics);
    }

}
