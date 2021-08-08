package com.ltran.smartpick.rest;

import com.ltran.smartpick.model.Ball;
import com.ltran.smartpick.service.EuroMillionsStatisticsService;
import com.ltran.smartpick.service.SmartPickService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Collection;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("smart-pick")
public class SmartPickController {

    @Autowired
    private SmartPickService smartPickService;

    @Autowired
    private EuroMillionsStatisticsService euroMillionsStatisticsService;

    @PostMapping(consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public @ResponseBody
    Collection<Ball> draw(@RequestBody Collection<Ball> balls, @RequestParam(value = "nbOfNumbers") Integer nbOfNumbers,
                          @RequestParam(value = "nbOfStars") Integer nbOfStars) {
        try {
            //euroMillionsStatisticsService.updateEuroMillionsStatistics();
            return smartPickService.draw(Arrays.asList(), nbOfNumbers, nbOfStars);
        } catch (Exception ex) {
            //TODO
            throw ex;
        }
    }

}
