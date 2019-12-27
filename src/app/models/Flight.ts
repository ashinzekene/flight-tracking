export interface Flight {
  /**
   * Unique ICAO 24-bit address of the transponder in hex string representation. All letters are lower case.
   */
  icao24: string;
  /**
   * Estimated time of departure for the flight as Unix time (seconds since epoch).
   */
  firstSeen: number;
  /**
   * ICAO code of the estimated departure airport. Can be null if the airport could not be identified.
   */
  estDepartureAirport: string;
  /**
   * Estimated time of arrival for the flight as Unix time (seconds since epoch)
   */
  lastSeen: number;
  /**
   * ICAO code of the estimated arrival airport. Can be null if the airport could not be identified.
   */
  estArrivalAirport: string;
  /**
   * Callsign of the vehicle (8 chars). Can be null if no callsign has been received.
   * If the vehicle transmits multiple callsigns during the flight, we take the one seen most frequently
   */
  callsign: string;
  /**
   * Horizontal distance of the last received airborne position to the estimated departure airport in meters
   */
  estDepartureAirportHorizDistance: number;
  /**
   * Vertical distance of the last received airborne position to the estimated departure airport in meters
   */
  estDepartureAirportVertDistance: number;
  /**
   * Horizontal distance of the last received airborne position to the estimated arrival airport in meters
   */
  estArrivalAirportHorizDistance: number;
  /**
   * Vertical distance of the last received airborne position to the estimated arrival airport in meters
   */
  estArrivalAirportVertDistance: number;
  /**
   * Number of other possible departure airports. These are airports in short distance to estDepartureAirport.
   */
  departureAirportCandidatesCount: number;
  /**
   * Number of other possible departure airports. These are airports in short distance to estArrivalAirport.
   */
  arrivalAirportCandidatesCount: number;
}
