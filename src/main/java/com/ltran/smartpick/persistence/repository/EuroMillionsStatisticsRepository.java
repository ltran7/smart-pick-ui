package com.ltran.smartpick.persistence.repository;

import com.ltran.smartpick.persistence.entity.EuroMillionsStatistics;
import com.ltran.smartpick.persistence.entity.EuroMillionsStatisticsId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EuroMillionsStatisticsRepository extends JpaRepository<EuroMillionsStatistics, EuroMillionsStatisticsId> {
}
