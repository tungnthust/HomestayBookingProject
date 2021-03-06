package com.group4T.homestaybooking.HomestayBooking.repository;

import com.group4T.homestaybooking.HomestayBooking.model.RoomFacility;
import com.group4T.homestaybooking.HomestayBooking.model.Facilitiy;
import com.group4T.homestaybooking.HomestayBooking.model.Location;
import com.group4T.homestaybooking.HomestayBooking.model.Reservation;
import com.group4T.homestaybooking.HomestayBooking.model.RoomDetail;
import com.group4T.homestaybooking.HomestayBooking.model.RoomPage;
import com.group4T.homestaybooking.HomestayBooking.model.RoomSearchCriteria;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Repository;
import org.thymeleaf.expression.Dates;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;

@Repository
public class RoomCriteriaRepository {
	
	@Autowired
	private EntityManager entityManager;
    private CriteriaBuilder criteriaBuilder;
   

    public RoomCriteriaRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
        this.criteriaBuilder = entityManager.getCriteriaBuilder();
    }

    public Page<RoomDetail> findAllWithFilters(RoomPage roomPage,
                                             RoomSearchCriteria roomSearchCriteria){
        CriteriaQuery<RoomDetail> criteriaQuery = criteriaBuilder.createQuery(RoomDetail.class);
        Root<RoomDetail> roomRoot = criteriaQuery.from(RoomDetail.class);
        Predicate predicate = getPredicate(roomSearchCriteria, criteriaQuery, roomRoot, roomPage);
        criteriaQuery.where(predicate);
        setOrder(roomPage, criteriaQuery, roomRoot);

        TypedQuery<RoomDetail> typedQuery = entityManager.createQuery(criteriaQuery);
        typedQuery.setFirstResult(roomPage.getPageNumber() * roomPage.getPageSize());
        typedQuery.setMaxResults(roomPage.getPageSize());

        Pageable pageable = getPageable(roomPage);

        long employeesCount = getRoomsCount(predicate);
        roomPage.setSortBy("id");

        return new PageImpl<>(typedQuery.getResultList(), pageable, employeesCount);
    }

    private Predicate getPredicate(RoomSearchCriteria roomSearchCriteria, CriteriaQuery<RoomDetail> criteriaQuery,
                                   Root<RoomDetail> roomRoot, RoomPage roomPage) {
    	
        List<Predicate> predicates = new ArrayList<>();
        
        if(Objects.nonNull(roomSearchCriteria.getQuery())){
        	Predicate[] districtPredicates = new Predicate[roomSearchCriteria.getDistrictId().size()];
        	for (Integer district: roomSearchCriteria.getDistrictId()) {
        		districtPredicates[roomSearchCriteria.getDistrictId().indexOf(district)] = criteriaBuilder.equal(roomRoot.get("location").get("district").get("id"),
                		district);
        	}
            predicates.add(
                    criteriaBuilder.or(districtPredicates));
        }
        
        if(Objects.nonNull(roomSearchCriteria.getAdultCount())){
            predicates.add(
                    criteriaBuilder.greaterThanOrEqualTo(roomRoot.get("capacity"),
                    		roomSearchCriteria.getAdultCount() + (int) (roomSearchCriteria.getChildrenCount() / 2))
            );
        }
        
        if(Objects.nonNull(roomSearchCriteria.getCheckinDate()) && Objects.nonNull(roomSearchCriteria.getCheckoutDate())){
        	List<Predicate> subqueryPredicates = new ArrayList<Predicate>();
        	
        	Subquery<Reservation> reservationSubquery = criteriaQuery.subquery(Reservation.class);
        	Root<Reservation> reservationRoot = reservationSubquery.from(Reservation.class);
        	subqueryPredicates.add(criteriaBuilder.equal(reservationRoot.get("roomId"), roomRoot.get("id")));
			Date searchCheckinDate = roomSearchCriteria.getCheckinDate();
        	Date searchCheckoutDate = roomSearchCriteria.getCheckoutDate();
        	Path<Date> checkinDate = reservationRoot.get("checkinDate");
        	Path<Date> checkoutDate = reservationRoot.get("checkoutDate");
        	subqueryPredicates.add(criteriaBuilder.or(criteriaBuilder.between(checkinDate, searchCheckinDate, searchCheckoutDate)
        			, criteriaBuilder.between(checkoutDate, searchCheckinDate, searchCheckoutDate)));
        	reservationSubquery.select(reservationRoot)
        					.where(subqueryPredicates.toArray(new Predicate[0]));
            predicates.add(
                    criteriaBuilder.not(criteriaBuilder.exists(reservationSubquery))
            );
        }
        
        if(Objects.nonNull(roomSearchCriteria.getLocation())){
            predicates.add(
                    criteriaBuilder.equal(roomRoot.get("location").get("id"),
                    		roomSearchCriteria.getLocation())
            );
        }
        
        if(Objects.nonNull(roomSearchCriteria.getDistrictId())){
        	Predicate[] districtPredicates = new Predicate[roomSearchCriteria.getDistrictId().size()];
        	for (Integer district: roomSearchCriteria.getDistrictId()) {
        		districtPredicates[roomSearchCriteria.getDistrictId().indexOf(district)] = criteriaBuilder.equal(roomRoot.get("location").get("district").get("id"),
                		district);
        	}
            predicates.add(
                    criteriaBuilder.or(districtPredicates));
        }
        if(Objects.nonNull(roomSearchCriteria.getProvinceId())){
            predicates.add(
                    criteriaBuilder.equal(roomRoot.get("location").get("province").get("id"),
                    		roomSearchCriteria.getProvinceId())
            );
        }
        if(Objects.nonNull(roomSearchCriteria.getType())){
        	Predicate[] typePredicates = new Predicate[roomSearchCriteria.getType().size()];
        	for (Integer type: roomSearchCriteria.getType()) {
        		typePredicates[roomSearchCriteria.getType().indexOf(type)] = criteriaBuilder.equal(roomRoot.get("type"),
                		type);
        	}
            predicates.add(
                    criteriaBuilder.or(typePredicates));
           
        }
        if(Objects.nonNull(roomSearchCriteria.getMin_price())){
            predicates.add(
                    criteriaBuilder.greaterThanOrEqualTo(roomRoot.get("pricePerDay"),
                    		roomSearchCriteria.getMin_price())
            );
        }
        if(Objects.nonNull(roomSearchCriteria.getMax_price())){
            predicates.add(
                    criteriaBuilder.lessThanOrEqualTo(roomRoot.get("pricePerDay"),
                    		roomSearchCriteria.getMax_price())
            );
        }
        if(Objects.nonNull(roomSearchCriteria.getBedCount())){
            predicates.add(
                    criteriaBuilder.equal(roomRoot.get("bedCount"),
                    		roomSearchCriteria.getBedCount())
            );
        }
        if(Objects.nonNull(roomSearchCriteria.getBedroomCount())){
            predicates.add(
                    criteriaBuilder.equal(roomRoot.get("bedroomCount"),
                    		roomSearchCriteria.getBedroomCount())
            );
        }
        if(Objects.nonNull(roomSearchCriteria.getBathroomCount())){
            predicates.add(
                    criteriaBuilder.equal(roomRoot.get("bathroomCount"),
                    		roomSearchCriteria.getBathroomCount())
            );
        }
        if(Objects.nonNull(roomSearchCriteria.getSort())){
        	roomPage.setSortBy("pricePerDay");
            if (roomSearchCriteria.getSort().equals("ASC")) {
            	roomPage.setSortDirection(Sort.Direction.ASC);
            }
            if (roomSearchCriteria.getSort().equals("DESC")) {
            	roomPage.setSortDirection(Sort.Direction.DESC);
            }
        }
        
        CriteriaQuery<Facilitiy> facilitiesCriteriaQuery = criteriaBuilder.createQuery(Facilitiy.class);
        Root<Facilitiy> facilities = facilitiesCriteriaQuery.from(Facilitiy.class);
        
        if(Objects.nonNull(roomSearchCriteria.getFacilities())){
        	for (Integer facility : roomSearchCriteria.getFacilities()) {
        		facilitiesCriteriaQuery.select(facilities)
				.where(criteriaBuilder.equal(facilities.get("id"), facility));
        		Facilitiy resultFacility = entityManager.createQuery(facilitiesCriteriaQuery).getSingleResult();
        		
        		predicates.add(
                        criteriaBuilder.isMember(resultFacility,
                        		roomRoot.get("facilities"))
                );
        	}
            
        }
        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }

    private void setOrder(RoomPage roomPage,
                          CriteriaQuery<RoomDetail> criteriaQuery,
                          Root<RoomDetail> roomRoot) {
        if(roomPage.getSortDirection().equals(Sort.Direction.ASC)){
            criteriaQuery.orderBy(criteriaBuilder.asc(roomRoot.get(roomPage.getSortBy())));
        } else {
            criteriaQuery.orderBy(criteriaBuilder.desc(roomRoot.get(roomPage.getSortBy())));
        }
    }

    private Pageable getPageable(RoomPage roomPage) {
        Sort sort = Sort.by(roomPage.getSortDirection(), roomPage.getSortBy());
        return PageRequest.of(roomPage.getPageNumber(),roomPage.getPageSize(), sort);
    }

    private long getRoomsCount(Predicate predicate) {
        CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);
        Root<RoomDetail> countRoot = countQuery.from(RoomDetail.class);
        countQuery.select(criteriaBuilder.count(countRoot)).where(predicate);
        return entityManager.createQuery(countQuery).getSingleResult();
    }
}
