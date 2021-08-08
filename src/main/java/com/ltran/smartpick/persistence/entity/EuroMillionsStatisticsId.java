package com.ltran.smartpick.persistence.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class EuroMillionsStatisticsId implements Serializable {

    @Column(name = "number", nullable = false)
    private int number;

    @Column(name = "type", nullable = false)
    private String type;

}
