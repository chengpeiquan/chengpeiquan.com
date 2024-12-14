import { FetchClient } from './client'
import { toJSON } from './utils'
import { type GitHubRepoDataItem } from './types'

class GitHubApiClient {
  private fetcher: FetchClient

  constructor(fetcher: FetchClient) {
    this.fetcher = fetcher
  }

  async repos() {
    return toJSON<GitHubRepoDataItem[]>(this.fetcher.get('/gh/repos'))
  }
}

class ApiClient {
  private fetcher = new FetchClient('https://api.chengpeiquan.com')

  gh: GitHubApiClient

  constructor() {
    this.gh = new GitHubApiClient(this.fetcher)
  }
}

export const apis = new ApiClient()
