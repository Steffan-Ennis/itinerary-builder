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
						templateUrl: 'scripts/itinerary/itinerary-form/itinerary-form.html',
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
						templateUrl: 'scripts/itinerary/itinerary-form/itinerary-form.html',
						controller: 'itineraryFormController',
						controllerAs: 'itineraryFormCtrl'
					}
				}
			})
			.state('site.itinerary-builder.stop', {
				parent: 'site.itinerary-builder',
				abstract: true
			})
			.state('site.itinerary-builder.stop.new', {
				parent: 'site.itinerary-builder.stop',
				url: '/itinerary-builder/:itineraryIndex/stop/new',
				views: {
					'content@': {
						templateUrl: 'scripts/itinerary/stop-form/stop-form.html',
						controller: 'stopformController',
						controllerAs: 'stopFormCtrl'
					}
				}
			})
			.state('site.itinerary-builder.stop.edit', {
				parent: 'site.itinerary-builder.stop',
				url: '/itinerary-builder/:itineraryIndex/stop/edit/:stopIndex',
				views: {
					'content@': {
						templateUrl: 'scripts/itinerary/stop-form/stop-form.html',
						controller: 'stopformController',
						controllerAs: 'stopFormCtrl'
					}
				}
			})
			.state('site.itinerary-builder.stop.site', {
				parent: 'site.itinerary-builder.stop',
				abstract: true
			})
			.state('site.itinerary-builder.stop.site.new', {
				parent: 'site.itinerary-builder.stop',
				url: '/itinerary-builder/:itineraryIndex/stop/:stopIndex/new',
				views: {
					'content@': {
						templateUrl: 'scripts/itinerary/site-form/site-form.html',
						controller: 'siteformController',
						controllerAs: 'siteFormCtrl'
					}
				}
			})
			.state('site.itinerary-builder.stop.site.edit', {
				parent: 'site.itinerary-builder.stop',
				url: '/itinerary-builder/:itineraryIndex/stop/:stopIndex/site/edit/:siteIndex',
				views: {
					'content@': {
						templateUrl: 'scripts/itinerary/site-form/site-form.html',
						controller: 'siteformController',
						controllerAs: 'siteFormCtrl'
					}
				}
			});
	})

	.directive('completeDialogue', function () {
		return {
			restric: 'E',
			templateUrl: 'scripts/itinerary/complete-dialog/complete-dialog.html',
			controller: 'completeDialogController',
			controllerAs: 'completeDialogCtrl',
		};
	})

	/**
	 * CRUD and data store  for itinerary data
	 * @return itineraryData service for dependency injection
	 */
	.service('itineraryData', ['$localStorage',

		function ($localStorage) {


			var self = this;

			/**
			 * initialising local storage
			 */
			if (typeof $localStorage.itineraries === 'undefined') {
				$localStorage.itineraries = [];
			}

			/*
			 * Collection for storing itineraries
			 */
			this.itineraries = $localStorage.itineraries;


			/*
			 * Defining constant option arrays to be passed to forms
			 */

			this.lengthOfVisitOptions = ['One Time', 'Recurring', 'Extended'];
			this.requestTypeOptions = ['Amendment', 'Routine', 'Urgent'];
			this.visitToOptions = ['Government facility', 'Commercial facility'];
			this.pertinentToOptions = ['Equipment or weapon system',
				'Foreign military sales or export license',
				'Programme or agreement',
				'Defence acquisition process',
				'Other'
			];

			/**
			 * Collection object for itineraries
			 */
			this.Itinerary = function (name, itineraryIndex) {
				this.stops = [];
				this.name = name;
				this.id = itineraryIndex;
				/* This data is auto populated*/
				this.metaData = {
					'totalStops': 0,
					'totalSites': 0,
					'duration': 0
				};
			};

			/**
			 * Defining constructors for consistency and object validity
			 */

			/**			
			 * Itinerary Contstructor
			 * @param {Date}   departureDate
			 * @param {String} departureCity
			 * @param {String} arrivalCity
			 * @param {String} visitingCity
			 * @param {bool}   visitingClassifiedSites
			 */
			this.Stop = function (departureDate, departureCity, arrivalCity, visitingCity, visitingClassifiedSites, stopIndex) {
				this.stopIndex = stopIndex;
				this.departureDate = departureDate;
				this.departureCity = departureCity;
				this.arrivalCity = arrivalCity;
				this.visitingCity = visitingCity;
				this.visitingClassifiedSites = visitingClassifiedSites;
				this.sites = [];
			};


			/**  
			 * Site constructor
			 * @param {DateRange} DateRange
			 * @param {VisitType} visitType
			 * @param {AgencyFacility} agencyFacility
			 * @param {VisitCoord} visitorCoord
			 * @param {Sponsor} sponsor
			 * @param {Purpose} purpose
			 * @param {String visitTo
			 * @param {AntLevel} antLevel
			 */
			this.Site = function (DateRange, visitType, agencyFacility, visitorCoord, sponsor, purpose, visitTo, antLevel) {
				this.DateRange = DateRange;
				this.visitType = visitType;
				this.agencyFacility = agencyFacility;
				this.visitorCoord = visitorCoord;
				this.sponsor = sponsor;
				this.purpose = purpose;
				this.visitTo = visitTo;
				this.antLevel = antLevel;
			};

			/**
			 * Constructs and empty site with correct objects
			 * @return {Site}
			 */
			this.constructEmptySite = function () {
				var site = new self.Site();
				site.visitType = new self.VisitType();
				site.agencyFacility = new self.AgencyFacility();
				site.visitorCoord = new self.VisitCoord();
				site.purpose = new self.Purpose();
				site.antLevel = new self.AntLevel();
				return site;
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
			 * VisiType constructor
			 * @param  {String} lengthOfVisit
			 * @param  {String} requestType
			 */
			this.VisitType = function (lengthOfVisit, requestType) {
				this.lengthOfVisit = lengthOfVisit;
				this.requestType = requestType;
			};

			/**
			 * DateRange constructor
			 * @param {String} dateFrom
			 * @param {String} dateTo
			 */
			this.DateRange = function (dateFrom, dateTo) {
				this.dateFrom = dateFrom;
				this.dateTo = dateTo;
			};

			/**
			 * Purpose constructor
			 * @param {[type]} subject
			 * @param {[type]} pertinentTo
			 */
			this.Purpose = function (subject, pertinentTo) {
				this.subject = subject;
				this.pertinentTo = pertinentTo;
			};

			/**
			 * AntLevel constructor
			 * @param {String} classInfo - Level of Australian Classified Information
			 * @param {String} nonClassInfo - Level of non Australian Classified Information
			 */
			this.AntLevel = function (ausInfo, nonAusInfo) {
				this.ausInfo = ausInfo;
				this.nonAusInfo = nonAusInfo;
			};

			/**
			 * pushes itenerary onto itenearies at trip index
			 * @param  {Stop}    stop
			 * @param  {Integer} itineraryIndex
			 */
			this.saveStop = function (stop, itineraryIndex) {
				$localStorage.itineraries[itineraryIndex].stops.push(stop);
				$localStorage.itineraries[itineraryIndex].metaData.totalStops++;
			};

			/**
			 * updates the stop in the stops collection stored on an itinerary
			 * @param  {Stop} stop
			 * @param  {Integer} itineraryIndex
			 * @param  {Integer} stopIndex
			 */
			this.updateStop = function (stop, itineraryIndex, stopIndex) {
				$localStorage.itineraries[itineraryIndex].stops[stopIndex] = stop;

			};


			/**
			 * Removes the stop from the iteneraries collection at the indexes passed in
			 * @param  {Integer} itineraryIndex
			 * @param  {Integer} stopIndex
			 */
			this.deleteStop = function (itineraryIndex, stopIndex) {
				$localStorage.itineraries[itineraryIndex].stops.splice(stopIndex, 1);
				$localStorage.itineraries[itineraryIndex].metaData.totalStops--;
			};

			/**
			 * Pushes the site onto the sites array at itinerary index
			 * @param  {Site}    site
			 * @param  {Integer} itineraryIndex
			 */
			this.saveSite = function (site, itineraryIndex, stopIndex) {
				$localStorage.itineraries[itineraryIndex].stops[stopIndex].sites.push(site);
				$localStorage.itineraries[itineraryIndex].metaData.totalSites++;
			};


			/**
			 * Pushes updates the site on the trip collection
			 * @param  {Site}    site
			 * @param  {Integer} siteIndex
			 * @param  {Integer} stopIndex
			 * @param  {Integer} itineraryIndex
			 */
			this.updateSite = function (site, siteIndex, stopIndex, itineraryIndex) {
				$localStorage.itineraries[itineraryIndex].stops[stopIndex].sites[siteIndex] = site;
			};


			/**
			 * Removes the site from the itineraries at the indexes passed in
			 * @param  {Integer} siteIndex
			 * @param  {Integer} stopIndex
			 * @param  {Integer} itineraryIndex
			 */
			this.deleteSite = function (siteIndex, stopIndex, itineraryIndex) {
				$localStorage.itineraries[itineraryIndex].stops[stopIndex].sites.splice(siteIndex, 1);
				$localStorage.itineraries[itineraryIndex].metaData.totalSites--;
			};

			/**
			 * creates a new trip and pushes it onto the trip collection
			 */
			this.saveItinerary = function (itinerary) {
				$localStorage.itineraries.push(itinerary);
			};

			/**
			 * updates the itinerary collection at the itineraryIndex
			 * @param  {Itinerary} itinerary
			 * @param  {Integer} itineraryIndex
			 */
			this.updateItinerary = function (itinerary, itineraryIndex) {
				$localStorage.itineraries[itineraryIndex] = itinerary;
			};

			/**
			 * Removes the itinerary from the collection at the index passed in
			 * @param  {Integer} itineraryIndex
			 */
			this.deleteItinerary = function (itineraryIndex) {
				$localStorage.itineraries.splice(itineraryIndex, 1);
			};

			return self;
		}
	]);
}());