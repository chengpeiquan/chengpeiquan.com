export interface ApiBaseResponse<T> {
  code: number // 0 on success
  data: T
  message: string
}

export interface GitHubRepoDataItem {
  id: number
  owner: string
  repo: string
  stars: number
  forks: number
  downloads: number
}
