---
title: 'Obsidian x Feiniu NAS: Building a Free Cross-Platform Note Sync & Backup Solution'
desc: 'I restarted journaling on August 1st, 2019, and have now kept it up for 6 years! Initially, I used a cloud note app, but four months ago I gradually migrated all the data to my home NAS. When I scraped the data back, I was surprised to find it was nearly 8 GB... I always thought it was mostly text, but turns out I included quite a few images. Looking back through it all, my life has been pretty colorful, haha!'
keywords: NAS,fnOS,Obsidian,Note sync,Note backup,Obsidian sync,Obsidian backup,Obsidian WebDAV
date: 2025-10-08 23:42:03
cover: https://cdn.chengpeiquan.com/img/2025/07/202507130003907.jpg?x-oss-process=image/interlace,1
categories:
  - tech
---

I restarted journaling on August 1st, 2019, and have now kept it up for 6 years! Initially, I used a cloud note app, but four months ago I gradually migrated all the data to my home NAS. When I scraped the data back, I was surprised to find it was nearly 8 GB... I always thought it was mostly text, but turns out I included quite a few images. Looking back through it all, my life has been pretty colorful, haha!

These journals are purely about life not study notes, technical notes, or anything like that. Those kinds of records feel external to life, cold and emotionless. My life journals capture my joys, sorrows, and random thoughts throughout different periods. When I'm bored, flipping through them lets me revisit my past experiences and growth there's a unique pleasure in that.

![Haha, many are beautiful moments living with my cats](https://cdn.chengpeiquan.com/img/2025/10/202510082103234.jpg?x-oss-process=image/interlace,1)

## Early Solution

When I restarted journaling in 2019, my main need was to record daily entries on my phone before bed, with a web or desktop client to occasionally review and manage them on my computer. Back then, there weren't many popular cross-platform note solutions, and most note apps were filled with ads.

Plus, I hadn't started exploring NAS yet and had no concept of self-hosted storage. I eventually chose an app with a clean interface and what I guessed was a smaller user base... Since the company's core business wasn't this note app, there wasn't much commercial interference, so that "clean experience" lasted for over five years.

However, with prolonged use, this became exactly why I wanted to switch. The app wasn't prioritized enough to receive updates, and bugs went unfixed. At one point, I even considered building my own client (based on the bug patterns, I guessed it was built with an older version of React Native).

![The user experience of this app became increasingly unbearable](https://cdn.chengpeiquan.com/img/2025/08/202508172109712.jpg?x-oss-process=image/interlace,1)

## New Migration Plan

Due to work being so busy, "building a personal client" remained on hold. I started the project in 2023, and it's still untouched, haha.

But procrastination has its benefits! Over these years, I kept hearing about Obsidian, Logseq, Joplin, Notion, as well as domestic options like WizNote, SiYuan Note, and document platforms like Yuque and Feishu Docs that also offer excellent note-taking features. With so many ready-made solutions, why reinvent the wheel?

Moreover, around the time I started that project, I also began exploring NAS (see my article [My First NAS](/article/my-custom-nas)). After getting familiar with it, using NAS to store relatively sensitive data seemed like the best choice.

## Considerations Before Migration

Once I decided to migrate, I first outlined what features I needed.

### Clarifying My Requirements

At this stage, using NAS for data storage was already decided. The uncertain factor was mainly choosing the client solution.

|    Requirement    | Description                                                                                                           |
| :---------------: | :-------------------------------------------------------------------------------------------------------------------- |
|    Self-Hosted    | Since my current need is mainly personal journaling (privacy-focused), I chose to store data on my NAS                |
|  Multi-Platform   | I mainly need iOS and macOS apps (or Web)                                                                             |
| Fast Performance  | Both startup and search speed matter after 6 years with thousands of notes, performance is crucial                    |
|      Good UX      | I want to switch precisely because the old app's experience was terrible at minimum, I can't have the same issues     |
|   Beautiful UI    | I originally chose that app for its clean design similar to [Shadcn UI](https://ui.shadcn.com)'s light mode aesthetic |
| Multi-Device Sync | The most important feature direct data transfer with my NAS                                                           |

### Choosing Between Clients

For self-hosted "offline-first note" apps, the mainstream options are Obsidian, Logseq, Joplin, WizNote, and SiYuan Note.

After comparing community reviews, self-hosted memory consumption (important for NAS), and client aesthetics, I narrowed it down to Obsidian and Logseq. Logseq launched slightly later than Obsidian, so it incorporates some of OB's strengths while adding modern features like bidirectional links and block references.

However, the community generally considers Logseq's performance slightly weaker when handling large note collections, and its outline-based organization feels overly complex for my current "journaling-focused" use case.

In the future, if I need to record other types of content, I might choose Logseq to differentiate it. But for now, I went with the more classic Obsidian.

## Current Solution

Next, let me talk about the specific architecture and configuration I have currently determined.

### Multi-terminal synchronization architecture

After comparing the options, my note setup architecture is very simple:

- NAS serves as the data storage center, providing sync via its built-in WebDAV service
- Multiple devices use Obsidian's official desktop and mobile clients, configured with sync functionality to connect with NAS

![Architecture diagram centered on NAS](https://cdn.chengpeiquan.com/img/2025/10/202510082340936.jpg?x-oss-process=image/interlace,1)

For the sync solution, with NAS available, WebDAV was the obvious choice:

- ✅ Fully private data, no third-party dependencies
- ✅ Extremely fast LAN sync speed, with optional external access via DDNS or tunneling
- ✅ Theoretically unlimited storage with no subscription costs (hard drive cost is included in NAS purchase)
- ✅ Obsidian has plugin support for WebDAV

### Comparison of other solutions

However, Obsidian also supports other sync solutions. Here's a comparison of the options I researched for reference:

|     Solution      | Pros                                                        | Cons                                                                                                                                   |
| :---------------: | :---------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| **Obsidian Sync** | Official solution, stable and reliable                      | Requires subscription, minimum $4/month, 1 GB limit, single files cannot exceed 5 MB                                                   |
| **iCloud Drive**  | Seamless Apple ecosystem integration, basic free tier       | Subscription needed for real use, minimum �6/month for 50 GB (otherwise only 5 GB), limited to Apple devices                           |
| **Cloud Storage** | Mainstream services, stable, basic free tier                | Free tier is slow with small capacity, subscription needed for better experience, still has capacity and file size limits              |
|   **Git Sync**    | Free, powerful version control, fast text diff              | Complex configuration, not suitable for non-technical users; only friendly for plain text, not ideal for notes with many images/videos |
| **WebDAV (NAS)**  | Free service, built-in out-of-the-box, ultra-fast LAN speed | Requires NAS device (one-time hardware investment)                                                                                     |

### Feiniu Sync Client

Here's another special sync solution worth mentioning: Feiniu Sync, which supports both Windows and macOS platforms.

The advantages of Feiniu Sync include:

- ✅ Maintained by the official Feiniu team, deeply integrated with Feiniu NAS
- ✅ Relatively simple configuration, more user-friendly for non-technical users
- ✅ Optimized for Feiniu NAS, potentially better sync performance

You can download the [Feiniu Sync Client](https://www.fnnas.com/download?key=fn-sync-client&utm_source=chengpeiquan.com) from the official website.

![Feiniu Sync Client Login Interface](https://cdn.chengpeiquan.com/img/2025/10/202510130102237.jpg?x-oss-process=image/interlace,1)

However, Feiniu Sync currently only has PC versions, with no mobile support yet. For my use case requiring iPhone journaling, the WebDAV solution paired with the Obsidian app is more suitable.

But if your primary use case is desktop file syncing (not limited to Obsidian), or you prefer a simpler configuration process, Feiniu Sync is also a viable option worth considering.

## User Experience

Let me first share my experience with the current setup. If this approach seems suitable for you, continue reading the configuration section.

### Old Data Migration

My previous note app didn't support data export, so I used DevTools to inspect its API request process and wrote a scraper to retrieve my note content.

Their API returned HTML, so I wrote a local HTML-to-Markdown converter (I recommend the [Remark](https://github.com/remarkjs) toolkit series).

Images in the notes were originally remote URLs. During scraping, I downloaded them locally, organized them by date folders, and changed the references in notes to relative paths pointing to local images. Of course, all this was handled with scripts.

I won't dive into specific details here frontend developers should be familiar with this kind of workflow, and web scraping isn't something to discuss publicly in detail.

### Usage Impressions

As I write this article, I've been using Obsidian + Feiniu NAS for four months, and the overall experience has been extremely satisfying:

**Pros:**

- ✅ **Fast Speed**: LAN sync is nearly instant, searching 2000+ notes is smooth
- ✅ **Stability**: No sync failures or data loss so far
- ✅ **Clean Interface**: Obsidian's interface is simple and comfortable to use
- ✅ **Rich Plugins**: Almost every feature has a plugin for customization
- ✅ **Data Security**: Can sync only within LAN for enhanced privacy without data leaving the network
- ✅ **Easy Backup**: NAS-side "File Backup" feature allows automatic backups to other storage locations

**Points to Note:**

- ⚠️ **Initial Configuration Barrier**: NAS setup is simple, but Obsidian's client has many options requiring some exploration
- ⚠️ **External Access Speed**: If NAS lacks a public IP, FN Connect's free tier may be slow (consider paid version)
- ⚠️ **Mobile Storage**: Obsidian is a local-first editor all files are stored on the device, ensure sufficient phone storage
- ⚠️ **Preventing Sync Conflicts**: When editing simultaneously on multiple devices, still need to watch for conflicts

## Multi-Device Sync Configuration

Next, let's discuss how to achieve multi-device sync centered around NAS, focusing on the Feiniu NAS side and Obsidian desktop client. Once the workflow is established, the Obsidian mobile app setup is identical.

### Feiniu NAS Configuration

The following steps are based on web interface operations. The Feiniu app interface is similar just follow in order. Note: use an administrator account to **log in to Feiniu NAS**, not a regular account, as many operations require admin privileges.

#### Create Note Storage Directory

I recommend creating a dedicated folder in "File Management" as the data storage root, such as `database`. This way, other similar data hosting can also be archived in this folder.

The actual data storage location can have another layer of directories as needed, for example, my journal is stored under `database/diary`.

> Important data should be stored in a protected storage space. If budget is limited, you can follow my approach: use two 2TB hard drives to create a RAID 1.

![Create data root directory](https://cdn.chengpeiquan.com/img/2025/10/202510062119261.jpg?x-oss-process=image/interlace,1)

#### Configure WebDAV Service

Feiniu NAS comes with built-in WebDAV service. Go to **"System Settings � File Sharing Protocols � WebDAV"** and enable the service. The default HTTP port 5005 / HTTPS port 5006 can be used directly or customized.

Then click "Set Visible Folder Range" on the WebDAV interface to configure which directories are accessible via WebDAV. Set the range according to your needs, making sure to include the data folder created earlier.

> On the NAS WebDAV configuration interface, you can see your access address:
>
> - `http://{Your NAS LAN IP}:{Port}/`
> - `http://{Your NAS Domain}:{Port}/`
>
> Note: HTTP and HTTPS use different port numbers

If you need domain-based WebDAV access, you can manage FN Connect accounts in **"System Settings � Remote Access"** or configure a domain via DDNS. I won't go into detail here Feiniu's interface is quite clear.

![System Settings - File Sharing Protocols - WebDAV](https://cdn.chengpeiquan.com/img/2025/10/202510060101116.jpg?x-oss-process=image/interlace,1)

### Obsidian Desktop Client Configuration

In Obsidian, following the most popular free sync solution, I use [Remotely Save](https://github.com/remotely-save/remotely-save). Additionally, to uniformly handle Markdown embedded file paths (images, videos, etc.), I also use the [Custom Attachment Location](https://github.com/RainCat1998/obsidian-custom-attachment-location) plugin.

#### Vault and Journal Settings

When launching Obsidian, you'll be guided to create a note vault essentially choosing a folder on your computer to store these notes. The selected folder acts as a root directory for the vault.

If, like me, you're using it for journaling or want to store notes in a single folder with a fixed template, you can configure some archiving rules in "Daily Notes." For example, I chose to store all journal entries in the `docs` folder, while the journal template is in the `template` folder (templates need to point to a specific file path).

![Obsidian's Daily Notes settings interface and corresponding Mac directory structure](https://cdn.chengpeiquan.com/img/2025/10/202510072232099.jpg?x-oss-process=image/interlace,1)

#### Internal Link Settings

Obsidian's default Markdown link and image reference syntax is its own format. For future compatibility with other clients, I recommend changing this to "Relative path to file."

![Change internal link rules to "Relative path to file"](https://cdn.chengpeiquan.com/img/2025/10/202510072303736.jpg?x-oss-process=image/interlace,1)

#### Installing Plugins

Plugins seem to install from GitHub, so ensure your network can access GitHub smoothly.

1. Open Obsidian Settings � Community Plugins � Turn off "Safe Mode"
2. Click "Browse" and search for `Remotely Save` (required) and `Custom Attachment Location` (optional)
3. Install and enable the plugins

#### Sync Plugin Configuration

The sync plugin is the core, using [Remotely Save](https://github.com/remotely-save/remotely-save). Here are the key settings:

|    Setting     | Configuration                                                                                                             |
| :------------: | :------------------------------------------------------------------------------------------------------------------------ |
| Remote Service | Select WebDAV                                                                                                             |
| Server Address | Copy the WebDAV access address from Feiniu NAS, append the database folder path, e.g., `http://192.168.8.8:5005/database` |
|    Username    | The username of the account that owns the `database` folder on Feiniu NAS                                                 |
|    Password    | The password of the account that owns the `database` folder on Feiniu NAS                                                 |
|  Concurrency   | Since I only use LAN sync, I set it to maximum, currently `20`                                                            |

Other settings can be adjusted as needed or left at defaults.

![Remotely Save](https://cdn.chengpeiquan.com/img/2025/10/202510070232761.jpg?x-oss-process=image/interlace,1)

#### Attachment Plugin Configuration

For supplementary plugins, I currently only use [Custom Attachment Location](https://github.com/RainCat1998/obsidian-custom-attachment-location) for attachment management. From the earlier vault and journal settings, you can see I have an `assets` folder. This is because my daily journals include not just text but also many images and sometimes videos. Without proper organization, managing these attachments would be a nightmare.

|             Setting             | Configuration                                                                                                                                       |
| :-----------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
|  Location for new attachments   | I configured this as `../assets/${noteFileName}`, so each journal's attachments are archived in a folder under `assets` named after the note file   |
| Should rename attachment folder | If the Markdown file is renamed, it monitors and renames the attachment folder accordingly. Though I rarely rename, this feature is handy when I do |

Other options can be adjusted as needed, such as auto-renaming images.

![Main setting: Location for new attachments option](https://cdn.chengpeiquan.com/img/2025/10/202510072239706.jpg?x-oss-process=image/interlace,1)

### Obsidian Mobile Device Configuration

My primary mobile device is iPhone, so I simply search for Obsidian in the App Store to download the client. You can also find downloads for other platforms on the official website.

After installing the app, repeat the above configuration steps on iPhone or other devices.

## Conclusion

In daily note-taking, my habit is to update on only one device, sync back to NAS when done, and the next time I launch Obsidian on another device, the plugin automatically compares versions and pulls the latest data from NAS, achieving bidirectional sync. In practice, this approach hasn't caused file conflicts the experience is very stable.

From starting journaling on a third-party app in 2019 to now building a private note system with Obsidian + Feiniu NAS, this 6-year data migration journey has finally concluded.

This solution isn't technically complex, but it represents a significant upgrade in content management philosophy:

- Full data control, with periodic backup and migration options on NAS
- All data is locally archived, accessible and editable even offline
- Markdown format is universal and extensible, not bound to any specific note client

After several months of use, whether for multi-device sync, search speed, or file security, this setup is far more reliable than previous cloud note solutions. If you also want a more controllable and long-term maintainable note system, this combination is worth trying.
