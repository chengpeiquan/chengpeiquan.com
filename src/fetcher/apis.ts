import { FetchClient } from './client'
import { type GitHubRepoDataItem, type NpmDownloadDataItem } from './types'
import { toJSON } from './utils'

class GitHubApiClient {
  constructor(private fetcher: FetchClient) {}

  async repos() {
    return toJSON<GitHubRepoDataItem[]>(this.fetcher.get('/gh/repos'))
  }
}

class NpmApiClient {
  constructor(private fetcher: FetchClient) {}

  async packages() {
    return toJSON<NpmDownloadDataItem[]>(this.fetcher.get('/npm/packages'))
  }
}

class ApiClient {
  private fetcher = new FetchClient('https://api.chengpeiquan.com')

  gh: GitHubApiClient
  npm: NpmApiClient

  constructor() {
    this.gh = new GitHubApiClient(this.fetcher)
    this.npm = new NpmApiClient(this.fetcher)
  }
}

export const apis = new ApiClient()
