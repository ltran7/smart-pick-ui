package com.ltran.smartpick.service.util;

import com.ltran.smartpick.model.Ball;
import com.ltran.smartpick.model.BallType;
import com.ltran.smartpick.persistence.entity.EuroMillionsStatistics;
import com.ltran.smartpick.service.DistributedRandomNumberGeneratorService;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static com.ltran.smartpick.model.BallType.NUMBER;
import static com.ltran.smartpick.model.BallType.STAR;
import static java.util.stream.Collectors.toSet;

public class SmartPickGeneratorUtil {

    public static Collection<Ball> generateDraw(Collection<Ball> balls, int nbOfNumbers, int nbOfStars,
                                                List<EuroMillionsStatistics> euroMillionsStatistics) {
        Set<Ball> draw = new HashSet<>(nbOfNumbers + nbOfStars);
        Set<Ball> numbers = balls.stream().filter(b -> NUMBER.equals(b.getType())).collect(toSet());
        Set<Ball> stars = balls.stream().filter(b -> STAR.equals(b.getType())).collect(toSet());

        draw.addAll(drawBalls(numbers, nbOfNumbers, NUMBER, euroMillionsStatistics));
        draw.addAll(drawBalls(stars, nbOfStars, STAR, euroMillionsStatistics));

        return draw;
    }

    private static Collection<Ball> drawBalls(Collection<Ball> balls, int limit, BallType type,
                                              List<EuroMillionsStatistics> euroMillionsStatistics) {
        Set<Ball> drawnBalls = new HashSet<>(limit);
        drawnBalls.addAll(balls);

        DistributedRandomNumberGeneratorService drng = createDistributedRandomNumberGenerator(euroMillionsStatistics, type);

        while (drawnBalls.size() < limit) {
            drawnBalls.add(new Ball(drng.getDistributedRandomNumber(), type));
        }

        return drawnBalls;
    }

    private static DistributedRandomNumberGeneratorService createDistributedRandomNumberGenerator(
            List<EuroMillionsStatistics> euroMillionsStatistics, BallType type) {
        DistributedRandomNumberGeneratorService drng = new DistributedRandomNumberGeneratorService();

        for (EuroMillionsStatistics stat : euroMillionsStatistics) {
            if (type.equals(BallType.valueOf(stat.getEuroMillionsStatisticsId().getType()))) {
                drng.addNumber(stat.getEuroMillionsStatisticsId().getNumber(), stat.getPercentage());
            }
        }

        return drng;
    }

}
