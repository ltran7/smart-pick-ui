package com.ltran.smartpick.model;

import org.junit.Test;

import static com.ltran.smartpick.model.BallType.NUMBER;
import static com.ltran.smartpick.model.BallType.STAR;
import static org.assertj.core.api.Assertions.assertThat;

public class BallTest {

    @Test
    public void ballsAreEqualWhenNumberAndTypeAreSame() {
        Ball ball1 = new Ball(1, NUMBER);
        Ball ball2 = new Ball(1, NUMBER);

        assertThat(ball1).isEqualTo(ball2);
    }

    @Test
    public void ballsAreNotEqualWhenNumberAndTypeAreDifferent() {
        Ball ball1 = new Ball(1, NUMBER);
        Ball ball2 = new Ball(2, STAR);

        assertThat(ball1).isNotEqualTo(ball2);
    }

    @Test
    public void ballsAreNotEqualWhenTypesAreDifferent() {
        Ball ball1 = new Ball(1, NUMBER);
        Ball ball2 = new Ball(1, STAR);

        assertThat(ball1).isNotEqualTo(ball2);
    }

    @Test
    public void ballsAreNotEqualWhenNumbersAreDifferent() {
        Ball ball1 = new Ball(1, NUMBER);
        Ball ball2 = new Ball(2, NUMBER);

        assertThat(ball1).isNotEqualTo(ball2);
    }

}