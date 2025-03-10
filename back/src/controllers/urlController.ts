import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { createResponse } from "../utils/utils";
import * as UrlService from "../services/urlService";

export const getAllUrls = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res
    .status(200)
    .json(createResponse(await UrlService.getAllUrls(), "Urls fetched successfully"));
});

export const createUrl = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res
    .status(200)
    .json(createResponse(await UrlService.createUrl(req.body), "Url created successfully"));
});

export const deleteUrl = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res
    .status(200)
    .json(createResponse(await UrlService.deleteUrl(req.params.id), "Url deleted successfully"));
});

export const updateUrl = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res
    .status(200)
    .json(createResponse(await UrlService.updateUrl(req.params.id, req.body), "Url updated successfully"));
});
