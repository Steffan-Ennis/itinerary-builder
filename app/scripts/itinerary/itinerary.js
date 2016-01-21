/**
 * @author Steffan Ennis
 * @email steffanennis87@gmail.com
 */
(function () {
	'use strict';
	angular.module('itineraryAngularApp')

	.config(function ($stateProvider) {

		/*
		 * initialising states for itinerary-builder
		 */
		$stateProvider

			.state('site.itinerary-builder', {
				parent: 'site',
				url: '/itinerary-builder',
				views: {
					'content@': {
						templateUrl: 'scripts/itinerary/itinerary.html',
						controller: 'itineraryController',
						controllerAs: 'itineraryCtrl'
					}
				}
			})
			.state('site.itinerary-builder.new', {
				parent: 'site.itinerary-builder',
				url: '/itinerary-builder/new',
				views: {
					'content@': {
						templateUrl: 'scripts/itinerary/itinerary-form.html',
						controller: 'itineraryFormController',
						controllerAs: 'itineraryFormCtrl'
					}
				}
			})
			.state('site.itinerary-builder.edit', {
				parent: 'site.itinerary-builder',
				url: '/itinerary-builder/edit/:itineraryIndex',
				views: {
					'content@': {
						templateUrl: 'scripts/itinerary/itinerary-form.html',
						controller: 'itineraryFormController',
						controllerAs: 'itineraryFormCtrl'
					}
				}
			});
	})

	/**
	 * CRUD and data store  for itinerary data
	 * @return itineraryData service for dependency injection
	 */
	.service('itineraryData', [function () {


		var self = this;

		/*
		 * Collection for storing itineraries
		 */
		this.itineraries = [];

		/*
		 * Defining constant option arrays to be passed to forms
		 */

		this.visitTypes = ['One Time', 'Recurring', 'Extended'];
		this.requestTypes = ['Amendment', 'Routine', 'Urgent'];
		this.visitTo = ['Government facility', 'Commercial facility'];

		/**
		 * Defining constructors for consistency
		 */


		/**
		 * Collection object for itineraries
		 */
		this.Itinerary = function (name) {
			this.stops = [];
			this.name = name;
			/* This data is auto populated*/
			this.metaData = {
				'total itineraries': 0,
				'total sites': 0,
				'duration': ''
			};
		};

		/**			
		 * Itinerary Contstructor
		 * @param {Date}   departureDate
		 * @param {String} departureCity
		 * @param {String} arrivalCity
		 * @param {String} visitingCity
		 * @param {bool}   visitingClassifiedSites
		 */
		this.Stop = function (departureDate, departureCity, arrivalCity, visitingCity, visitinClassifiedSites) {
			this.departureDate = departureDate;
			this.departureCity = departureCity;
			this.arrivalCity = arrivalCity;
			this.visitingCity = visitingCity;
			this.visitinClassifiedSites = visitinClassifiedSites;
			this.sites = [];
		};


		/**
		 * Site constructor
		 * @param {Date}           dateFrom
		 * @param {Date}           dateTo
		 * @param {String}         visitType
		 * @param {String}         requestType
		 * @param {AgencyFacility} agencyFacility
		 * @param {VisitorCoord}   visitorCoord
		 * @param {Sponsor}        sponsor
		 * @param {String}         purpose
		 * @param {String}         visitIsPertinentTo
		 */
		this.Site = function (dateFrom, dateTo, visitType, requestType, agencyFacility, visitorCoord, sponsor, purpose, visitIsPertinentTo) {
			this.dateFrom = dateFrom;
			this.dateTo = dateTo;
			this.visitType = visitType;
			this.requestType = requestType;
			this.detailsOfAgencyFacility = agencyFacility;
			this.visitorCoord = visitorCoord = visitorCoord;
			this.sponsor = sponsor;
			this.purpose = purpose;
			this.visitIsPertinentTo = visitIsPertinentTo;
		};

		/**
		 * AgencyFacility constructor
		 * @param {String} name
		 * @param {Number} phoneNumber
		 * @param {String} email
		 * @param {String} address
		 */
		this.AgencyFacility = function (name, phoneNumber, email, address) {
			this.name = name;
			this.phoneNumber = phoneNumber;
			this.email = email;
			this.address = address;
		};

		/**
		 * Sponsor constructor
		 * @param {String} name
		 * @param {String} organisation
		 * @param {Number} phoneNumber
		 * @param {String} email
		 */
		this.Sponsor = function (name, organisation, phoneNumber, email) {
			this.name = name;
			this.organisation = organisation;
			this.phoneNumber = phoneNumber;
			this.email = email;
		};

		/**
		 * VisitCoord constructor
		 * @param {String} name
		 * @param {Number} phoneNumber
		 * @param {String} email
		 * @param {String} fax
		 * @param {String} address
		 */
		this.VisitCoord = function (name, phoneNumber, email, fax, address) {
			this.name = name;
			this.phoneNumber = phoneNumber;
			this.email = email;
			this.fax = fax;
			this.address = address;
		};


		/**
		 * pushes itenerary onto itenearies at trip index
		 * @param  {Stop}    stop
		 * @param  {Integer} itineraryIndex
		 */
		this.saveStop = function (stop, intineraryIndex) {
			this.itineraries[intineraryIndex].itineraries.push(stop);
		};

		/**
		 * updates the stop in the stops collection stored on an itinerary
		 * @param  {Stop} stop
		 * @param  {Integer} itineraryIndex
		 * @param  {Integer} stopIndex
		 */
		this.updateStop = function (stop, itineraryIndex, stopIndex) {
			this.itineraries[itineraryIndex].stops[stopIndex] = stop;
		};


		/**
		 * Removes the stop from the iteneraries collection at the indexes passed in
		 * @param  {Integer} itineraryIndex
		 * @param  {Integer} stopIndex
		 */
		this.deleteStop = function (itineraryIndex, stopIndex) {
			this.itineraries[itineraryIndex].stops.splice(stopIndex, 1);
		};

		/**
		 * Pushes the site onto the sites array at itinerary index
		 * @param  {Site}    site
		 * @param  {Integer} itineraryIndex
		 */
		this.saveSite = function (site, itineraryIndex) {
			self.trips[itineraryIndex].push(site);
		};


		/**
		 * Pushes updates the site on the trip collection
		 * @param  {Site}    site
		 * @param  {Integer} siteIndex
		 * @param  {Integer} stopIndex
		 * @param  {Integer} itineraryIndex
		 */
		this.updateSite = function (site, siteIndex, stopIndex, itineraryIndex) {
			self.itineraries[itineraryIndex].stops[stopIndex].sites[siteIndex] = site;
		};


		/**
		 * Removes the site from the itineraries at the indexes passed in
		 * @param  {Integer} siteIndex
		 * @param  {Integer} stopIndex
		 * @param  {Integer} itineraryIndex
		 */
		this.deleteSite = function (siteIndex, stopIndex, itineraryIndex) {
			this.itineraries[itineraryIndex].stops[stopIndex].sites.splice(siteIndex, 1);
		};

		/**
		 * creates a new trip and pushes it onto the trip collection
		 */
		this.saveItinerary = function () {
			self.itineraries.push(new self.Itinerary());
		};

		/**
		 * updates the itinerary collection at the itineraryIndex
		 * @param  {Itinerary} itinerary
		 * @param  {Integer} itineraryIndex
		 */
		this.updateItineary = function (itinerary, itineraryIndex) {
			self.itineraries[itineraryIndex] = itinerary;
		};

		/**
		 * Removes the itinerary from the collection at the index passed in
		 * @param  {Integer} itineraryIndex
		 */
		this.deleteItinerary = function (itineraryIndex) {
			self.itineraries.splice(itineraryIndex, 1);
		};

		return self;
	}]);
}());