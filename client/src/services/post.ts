import {
  RequestConfig,
  RequestCreateConfig,
  RequestDeleteConfig,
  RequestGetByIdConfig,
  RequestUpdateConfig
} from '@app/api/types';
import { endpoints } from '@app/constants';
import { instance } from './core';

function getArtists<T>({ v = 'v1', options }: RequestConfig): Promise<T> {
  return instance.get(endpoints.GET_ARTISTS.replace(':version', v), options);
}

function createArtist({ v = 'v1', data, options }: RequestCreateConfig): Promise<IArtist> {
  return instance.post(endpoints.GET_ARTISTS.replace(':version', v), data, options);
}

function getArtist({ v = 'v1', id, options }: RequestGetByIdConfig): Promise<IArtist> {
  return instance.get(endpoints.GET_ARTIST.replace(':version', v).replace(':id', id), options);
}

function updateArtist({ v = 'v1', id, data, options }: RequestUpdateConfig): Promise<IArtist> {
  return instance.patch(endpoints.GET_ARTIST.replace(':version', v).replace(':id', id), data, options);
}

function deleteArtist({ v = 'v1', id, options }: RequestDeleteConfig): Promise<void> {
  return instance.delete(endpoints.GET_ARTIST.replace(':version', v).replace(':id', id), options);
}

export default { getArtists, createArtist, getArtist, updateArtist, deleteArtist };
