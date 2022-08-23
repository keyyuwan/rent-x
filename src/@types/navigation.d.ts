import { CarDTO } from "../dtos/CarDTO";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      CarDetails: { car: CarDTO };
      Scheduling: { car: CarDTO };
      SchedulingDetails: { car: CarDTO; dates: string[] };
      Confirmation: { title: string; message: string; nextScreenRoute: string };
      MyCars: undefined;
      FirstStep: undefined;
      SecondStep: {
        user: { name: string; email: string; driverLicense: string };
      };
    }
  }
}
