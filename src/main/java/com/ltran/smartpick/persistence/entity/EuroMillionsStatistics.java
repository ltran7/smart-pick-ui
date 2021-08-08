package com.ltran.smartpick.persistence.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class EuroMillionsStatistics {

    @EmbeddedId
    private EuroMillionsStatisticsId euroMillionsStatisticsId;

    @Column(name = "percentage", nullable = false)
    private double percentage;

    @Column(name = "last_update", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastUpdate;

}
