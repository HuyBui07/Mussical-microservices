export const servicesLiveStatus: { [key: string]: boolean } = {
  service1: true,
  service2: true,
  service3: true,
};

export const servicesUrls: { [key: string]: string } = {
  service1: process.env.SERVICE_1_URL as string,
  service2: process.env.SERVICE_2_URL as string,
  service3: process.env.SERVICE_3_URL as string,
};
