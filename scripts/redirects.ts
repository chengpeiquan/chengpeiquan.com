import fs from 'fs-extra'
import { Octokit } from '@octokit/rest'

async function run() {
  const manual = await fs.readFile('_redirects', 'utf-8')
  const gh = new Octokit({ token: process.env.GITHUB_TOKEN! })

  const { data: repos } = await gh.repos.listForUser({
    type: 'owner',
    username: 'antfu',
    per_page: 100,
  })

  // console.log(repos)

  const redirects: [string, string, number][] = []

  for (const repo of repos) {
    if (['test', 'static', 'repro', 'issue', 'resume', 'antfu'].some(i => repo.name.includes(i)))
      continue
    if (!repo.private && !repo.fork && !repo.archived)
      redirects.push([`/${repo.name}`, repo.url.replace('api.github.com/repos', 'github.com'), 302])
  }

  const final = `${manual}\n${redirects.map(i => i.join('\t')).join('\n')}`

  await fs.writeFile('_dist_redirects', final, 'utf-8')
}

run()
