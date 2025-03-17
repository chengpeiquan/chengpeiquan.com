import { isServer } from '@bassist/utils'
import { githubConfig } from '@/config/project-config'
import { FetchClient } from './client'
import { type GitHubRepoDataItem, type NpmDownloadDataItem } from './types'
import { toDecodedMarkdown, toJSON } from './utils'

class GitHubApiClient {
  private ghFetcher = new FetchClient(githubConfig.api)
  private ghAuthHeader = {
    Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
  }

  constructor(private fetcher: FetchClient) {
    if (isServer) {
      console.log(process.env)
    }
  }

  async repos() {
    return toJSON<GitHubRepoDataItem[]>(this.fetcher.get('/gh/repos'))
  }

  async fetchMarkdown(owner: string, repo: string, path: string) {
    return toDecodedMarkdown(
      this.ghFetcher.get(`/repos/${owner}/${repo}/contents/${path}`, {
        headers: this.ghAuthHeader,
      }),
    )
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
