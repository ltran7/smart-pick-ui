package com.ltran.smartpick.service.util;

import com.ltran.smartpick.model.BallType;
import com.ltran.smartpick.persistence.entity.EuroMillionsStatistics;
import com.ltran.smartpick.persistence.entity.EuroMillionsStatisticsId;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.ltran.smartpick.model.BallType.NUMBER;
import static com.ltran.smartpick.model.BallType.STAR;
import static java.lang.Integer.parseInt;

public class EuroMillionsStatisticsUtil {

    public static List<EuroMillionsStatistics> extractEuroMillionsStatistics(Document doc) {
        List<EuroMillionsStatistics> euroMillionsStatistics = new ArrayList<>();

        final int numberOfDraws = getNumberOfDraws(doc);
        final Elements mainStatistics = doc.getElementsByClass("statistics-main");

        euroMillionsStatistics.addAll(getBallStatistics(mainStatistics.get(0), numberOfDraws, NUMBER));
        euroMillionsStatistics.addAll(getBallStatistics(mainStatistics.get(1), numberOfDraws, STAR));

        return euroMillionsStatistics;
    }

    private static int getNumberOfDraws(Document doc) {
        final Element header = doc.getElementById("revHeader559");
        final String drawsIncluded = header.child(2).text();
        return parseInt(drawsIncluded.replaceAll("[^0-9]", ""));
    }

    private static List<EuroMillionsStatistics> getBallStatistics(Element element, int numberOfDraws, BallType ballType) {
        final String[] ballStatistics = element.text().replaceAll("[a-z]", "").split(" ");
        return convertToListOfEuroMillionsStatistics(ballStatistics, numberOfDraws, ballType);
    }

    private static List<EuroMillionsStatistics> convertToListOfEuroMillionsStatistics(String[] ballStatistics, int numberOfDraws, BallType ballType) {
        List<EuroMillionsStatistics> euroMillionsStatistics = new ArrayList<>();
        for (int i = 0; i < ballStatistics.length; i = i + 3) {
            euroMillionsStatistics.add(
                    new EuroMillionsStatistics(
                            new EuroMillionsStatisticsId(parseInt(ballStatistics[i]), ballType.name()),
                            computePercentage(parseInt(ballStatistics[i + 1]), numberOfDraws),
                            new Date()
                    )
            );
        }
        return euroMillionsStatistics;
    }

    private static double computePercentage(int ballStatistic, int numberOfDraws) {
        double computedPercentage = (100.0 * ballStatistic) / numberOfDraws;
        return new BigDecimal(computedPercentage).setScale(2, RoundingMode.HALF_UP).doubleValue();
    }

}
