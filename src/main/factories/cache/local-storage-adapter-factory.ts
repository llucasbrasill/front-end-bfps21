import { SetStorage } from '@/data/protocols/cache/set-storage'
import { LocalStorageAdapter } from '@/infrastructure/cache/local-storage-adapter'

export const makeLocalStorageAdpter = (): SetStorage => {
  return new LocalStorageAdapter()
}
