import urlModel, { IUrl } from "../models/urlModel";

export const getAllUrls = async (): Promise<IUrl[]> => {
  return await urlModel.find();
};

export const createUrl = async (url: IUrl): Promise<IUrl> => {
  const createdUrl = await urlModel.create(url);
  return createdUrl;
};

export const deleteUrl = async (id: string): Promise<IUrl | null> => {
  const deletedUrl = await urlModel.findByIdAndDelete(id);
  return deletedUrl;
};

export const updateUrl = async (id: string, url: IUrl): Promise<IUrl | null> => {  
  const updatedUrl = await urlModel.findByIdAndUpdate(id, url, { new: true });
  return updatedUrl;
};

export const updateStatus = async (id: string, isAlive: boolean) => {
  const updatedUrl = await urlModel.findByIdAndUpdate(id, { is_online: isAlive }, { new: true });
  return updatedUrl;
};


