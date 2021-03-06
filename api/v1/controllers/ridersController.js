import util from '../utils/utils';
import Queries from '../../../db/queries';
import getAllHelper from '../helpers/getAllHelper';
import sortDrivers from '../helpers/sortDrivers';
import getNearByDrivers from '../helpers/getNearbyDrivers';
import getOneHelper from '../helpers/getOneHelper';

export default class RidersController {
  static async getAllRiders(req, res) {
    const query = await Queries.select('*', 'riders');
    getAllHelper(query, res, util, 'All riders', 'No riders found');
  }

  static async getOneRider(req, res) {
    const { id } = req.params;
    await getOneHelper(res, util, id, 'Rider', 'riders');
  }

  static async getNearByDrivers(req, res) {
    const { location } = req.params;
    const drivers = await getNearByDrivers(location);
    const nearDrivers = await sortDrivers(drivers).slice(0, 3);
    getAllHelper(
      nearDrivers,
      res,
      util,
      `Available drivers near ${location}`,
      `No driver is currently available near ${location}`
    );
  }
}
