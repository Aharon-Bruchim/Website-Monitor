import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { createResponse } from "../utils/utils";
import * as WebsiteService from "../services/websiteService";

export const getAllWebsites = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res
    .status(200)
    .json(createResponse(await WebsiteService.getAllWebsites(), "Websites fetched successfully"));
});

export const createWebsite = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res
    .status(200)
    .json(createResponse(await WebsiteService.createWebsite(req.body), "Website created successfully"));
});

export const deleteWebsite = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res
    .status(200)
    .json(createResponse(await WebsiteService.deleteWebsite(req.params.id), "Website deleted successfully"));
});

export const updateWebsite = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res
    .status(200)
    .json(createResponse(await WebsiteService.updateWebsite(req.params.id, req.body), "Website updated successfully"));
});
