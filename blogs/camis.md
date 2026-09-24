---
title: "Dev-Ops at Camis"
summary: "What I worked on as a Dev Ops Engineer coop student at Camis."
date: "09-12-2026"
edited: "09-12-2026"
---

I spent my eight-month work term at Camis as a Dev-Ops Engineer Co-op, from January 1st, 2026 to the end of August,
2026. Almost all of my work was related to Camis’s infrastructure and tooling: rewriting the internal tools the rest of
the company uses, moving our scheduled jobs off of Windows VMs and into containers, simplifying how we manage each
client's infrastructure, building a new alerting system, and taking a first crack at an autonomous dev box. Here, I want
to cover what Camis does, and the five larger projects I got to take ownership of over the term, and what I took away
from my time there.

Camis is a tech company that specializes in providing an entire software suite to campgrounds. This includes everything
that a campground would need to operate. There are the online portals used by customers to make reservations or purchase
items campgrounds would sell, such as firewood. There is the desktop app used by park employees to create point-of-sale
transactions, manage and update the maps of the campground, create/modify their online products, and track which sites
are closed. And there are the mobile apps for park workers to check car license plates as well as verify camper
information as they travel the park, and so much more.

<br/>

## My Time at Camis

During my time there, Camis had just over 30 clients, some of the biggest included Ontario Parks, Parks Canada, and
Michigan State Parks. It was incredible to see how such a small company (in the grand scheme of tech companies) could
comfortably manage so many clients, each with so many concurrent users, all with slightly different needs and
requirements. One example that stands out is the 70,000-user rush we managed for Parks Canada’s reservations website on
the opening day of Banff, summer 2026.

Over my eight-month term there, I got to dabble in almost everything Dev-Ops worked on. There were five large projects
which I spent the most time working on. These included:

- Rewriting internal tools used to monitor health, search for system-sent emails, generate changelogs, trigger
  production jobs, and view application insights
- Rebuilding our internal scheduled tasks system that creates scrub databases, sends automated reports, restarts jobs,
  sends health alerts, scales up resources during rush times, and so, so much more
- Reworking how some of our Azure infrastructure would get applied using a new tool called Terragrunt
- Building a new alerting system to notify when production endpoints become unresponsive
- Designing the first iteration of an ‘autonomous dev box’ that used AI to have a crack at fixing a bug before it was
  assigned to a software developer

In addition to working on and taking ownership of some of these larger projects, I had the opportunity to learn about
our deployment pipeline built on top of Octopus Deploy, how our massive databases are structured and queried against,
and how we generate anonymized reports for all sorts of information across client databases, but also what it's like to
work at an established tech company: the cool aspects, like working together with different teams to solve different
parts of the same end goal, and what it's like working with so many people with similar interests and ways of thinking…
but also the not-so-cool aspects, like dealing with corporate changes and mandates, and realizing how ridiculously
ignorant management can be of the effects of their changes.

<br/>

## Rewriting Internal Tools

At Camis, Dev-Ops manages a collection of internal tools to perform various tasks to serve the needs of various teams
across the company. For example, an email lookup tool for the call center, a way to trigger an environment's jobs for
the QA team, a way to generate a changelog based on commits between two versions for the client care team, and so on.
All these tools were centralized in a panel we called Prospect. When I started there, the panel was built using vanilla
HTML, CSS, and JavaScript, with ExpressJS and PowerShell scripts powering the rest api, all hosted on an internal
Windows VM. Many of the existing tools were broken, and some were just very slow. Libraries were out of date, and it did not
support Camis’s SSO!

Initially the plan was not to rewrite it, and I was fixing all the issues that were reported on one by one, but coming
from my previous co-op where I was working with modern web frameworks like React and Next.js, working with vanilla
JavaScript and ExpressJS felt a little like I was just writing new obsolete code, so I proposed a modern rewrite with
tools I was personally familiar with: Next.js and TailwindCSS.

The rewrite took about a month before I was able to replace what we currently had up. It was a lot easier than expected,
since all the logic was already written for the most part (credits to the rest of the team), and already worked. All I
had to do was put it in a prettier package and fix the bugs I found along the way. It also gave me an opportunity to
talk one on one with all the teams that used the old versions of the tools, and find ways I could make it better.
Examples being more configurable metrics breakdowns for the client care team, or supporting URL params for form fields
so people could easily send links to others or save their queries. Additionally, with the move to Next.js, I switched to
using NPM to manage libraries over CDN script links, which allowed for much easier dependency updates with Dependabot.
We were also able to move from the Azure Windows VM to a simple container web app, which significantly reduced hosting
costs!

All in all, it was a fun and rewarding project that gave me the opportunity to get to chat with all the different teams
around the company! It is a big change for my team though... I just hope they find it easy enough to maintain now that my
co-op has ended!

<br/>

## Rebuilding Our Internal Scheduled Tasks System

The scheduled tasks server at Camis, when I started there, was a Windows VM that was loaded with a bunch of PowerShell
scripts, triggered by Windows Task Scheduler. The jobs served all sorts of purposes, including creating scrub databases,
sending automated reports to clients, restarting production services, sending health alerts, scaling up Azure resources
in rush times, and a ton more.

My goal was to move all the jobs from a Windows VM to Azure Container Apps Jobs. Doing so would allow us to get rid of
the multiple expensive VMs that were running the jobs, and allow us to manage the jobs’ dependencies more easily.

Microsoft provides Linux container images with PowerShell already baked in. Using one of these images, I was able to
build a single container containing all of the scripts for each job, along with a JSON config file for each one. The
config file contains a cron schedule, a name, an enabled boolean, and a set of optional environment variables to be
passed to the script. The deployment pipeline would build and push an updated container to an Azure Container Registry,
and would then also read all the config files and compare all the jobs that exist in the git repository to what
currently exists in Azure. Disabled jobs would be destroyed, new or enabled jobs would be created, and jobs that had
environment variables or schedules changed would be updated. From then on out, all jobs would use the updated container
image.

By the end of the migration we were able to retire the Windows VMs that had been running the jobs, and replace them with
the one container image that every job now runs from. Because a job only spins up a container when its schedule actually
fires, rather than sitting on a VM that runs all day whether it is doing anything or not, our hosting costs for the jobs
dropped a good amount too.

I had a lot of fun with this project, mostly because it forced me to think about how the rest of the team would actually
use the thing I was building, being one of our most active repositories, and also because I got to design my own brand
new deployment pipeline (Which in my humble opinion worked in a pretty cool way).

<br/>

## Simplifying Our Infrastructure Codebase with Terragrunt

My first experience with Terraform was here at Camis, and it was honestly the coolest thing I feel I got to learn about
and play with! Before Camis, I did not really understand where and why infrastructure as code would be useful, and now I am
thinking about how I should be managing my homelab with Terraform.

As mentioned earlier, Camis has over 30 clients, each running basically identical tech stacks under the hood. For
example, they all need the same infrastructure to run their user-facing websites, the park point-of-sale system, the
park mobile app, and so on. The issue is that some clients do not pay Camis for the mobile app, or require slightly
different infrastructure for the point-of-sale system they want to use, or require extra infrastructure for way higher
user load requirements. To address these differences in requirements for each park, the team had used JSON files in
combination with PowerShell scripts to generate Terraform files based on how the client should be configured. For
example, if a park did not pay for the mobile app (because they do not require it), a boolean would be set to false in a
JSON config for the client in question. PowerShell scripts would then read those configs and spit out JSON Terraform
infrastructure files (.tf.json) for that particular client without the app infrastructure included.

While this solution did work very well for the team, it did add another layer of complexity, requiring people to be
familiar not just with Terraform, but also with PowerShell scripts. The team is required to keep each client's
infrastructure separate. This was not only to satisfy legal requirements, but also contractual requirements. When the
repo was initially created, Terraform modules were not able to satisfy the team's requirements, so the homebrew
PowerShell script generation system was created.

When I started my term there, I was convinced that there had to be some solution out there that tackled the exact issue
our team solved with PowerShell scripts, and there was: Terragrunt. Terragrunt had its first stable 1.0.0 release just
around when I started my time at Camis, and solved the exact same problem, but in a more abstractable way. It works as a
wrapper around Terraform that reads a config file for an environment, then copies a Terraform module into a temporary
working directory with infrastructure specific to the client’s environment, exactly like how our PowerShell scripts
worked, but with native Terraform file types and Terragrunt tooling. Because it is more abstract, it becomes simpler to
make changes, as you only need to work with Terraform and client-specific configs. Additionally, because it works so
similarly to how our PowerShell scripting solution worked, porting to Terragrunt’s system was fairly straightforward,
merely representing the same infrastructure in a different format.

Since it is a more native solution, it also opened the doors to allow our CI/CD pipelines to do proper Terraform
validation, as Terragrunt offers tools for formatting and validating. This would have been a little trickier with our
homebrew PowerShell solution. It also natively supports applying changes and creating Terraform plans in parallel, as
well as automatic retries when transient errors happen, such as Azure rate limiting, hopefully speeding up
infrastructure rollouts into the future.

The port was finished and merged before the end of my term, with every client environment now having infrastructure
managed through Terragrunt. It was really satisfying to eventually see my new system plan one-to-one with our
infrastructure, while working very differently under the hood.

<br/>

## Building a New Alerting System

In order to save on costs, Camis was looking to retire the use of an expensive third-party service we used for
monitoring our company’s services. I was tasked with creating a new monitoring system to replace it. While it seemed
simple enough, it actually promised to be quite hard to reliably notify the team of real issues or slowdowns, and filter
out any false positives. I ended up building tools that I believe will be suitable.

The first is a tool that notifies the team when response times start to climb. All of our applications’ REST API request
response times were already logged, so all this tool had to do was periodically run a query to check if median response
times were over a certain threshold, and notify us when that happened. The issue was that some of our clients’ payment
processors would have ridiculously high response times, and would skew the results of the query. After identifying all
of the known-to-be-slow endpoints, and tweaking thresholds to accommodate for this behavior, we did arrive at a solution
that seemed to work well without many false positives. Since this solution worked by filtering logs, though, it would
not tell us if a service was actually offline or not responding at all.

To detect if a service was actually offline or not, I developed another tool using a new scheduled task that would ping
every health endpoint for every service of every client based on automatically generated lists, and see if it got any
response. If a response was not received for 3 attempts in a row, the alert would trigger, sending a message every five
minutes until it saw a recovery. For this tool, I also built a new dashboard that could snooze alerts for endpoints we
knew to be intentionally down (such as alerts for endpoints for a new client or service that would slowly be rolling out
over the course of days or weeks), as well as track how long services have been unresponsive, who snoozed the alerts,
and how many attempts have been made to ping the endpoint by the task.

<br/>

## Designing an Autonomous Dev Box

The goal of this project was to create a tool that could automatically attempt to fix a bug ticket before it even
reached the eyes of a software dev, with them just seeing a pull request up for review created by the tool. The idea was
to have a container that exists in the cloud, with an up-to-date version of internal repos already pulled and available,
access to Jira and bug ticket related information, and AI CLI tools already pre-installed. This container would search
for and be assigned new bug tickets as they were created, and follow a robust pipeline made of skill files designed for
Anthropic’s Claude that would read, fix, test, and open a PR with a proposed solution to any bug assigned.

The initial scope of the project, my job, was to build the initial container image with all the tools installed, and
find a way to spin it up for a manually assigned ticket. For this, I built a PowerShell script that accepted a dev’s
scoped credentials, the bug ticket to be assigned to the container, the repos that should be pulled by the container,
whether the container should be the Windows or Linux variant, the Claude model that should be used, as well as a few
other optional parameters. The script would then securely write this information to an Azure Key Vault, and then spin up
an Azure Container Instance with all the information, and the addresses to the information in the Key Vault. The
container would spin up, pull the necessary repos, and then initiate a Claude session using our skill-based bugfix
pipeline.

My initial tool did work semi-reliably, however, it was a total mess. Trying to force non-deterministic tools to work in
a deterministic way proved rather challenging. Unfortunately, my time at Camis finished before I was able to begin a
phase two of this project, where we were planning to automate this tool. I am confident that the team will be able to
get something that will work reliably well enough to greatly cut down on the time spent on trivial fixes, such as PRs
for grammar fixes, styling changes, etc., that are still forced to go through long processes by developers.

<br/>
<hr/>
<br/>

Looking back on the eight months, the thing I am most glad about is how much of it I actually got to own. I came in
expecting to be handed small tickets, not to many large projects, but it was not long at all before I got to propose the
Prospect rewrite, pick the new tool we would use to manage all of our client infrastructure, and make big changes to our
companies scheduled tasks. Being trusted with that as a co-op student is not what I expected walking in, and it is the
main reason I got as much out of the term as I did.

The biggest thing I would do differently is find more opportunities to talk with the remote workers on my team. I really
enjoyed hearing from them in our daily stand ups, and thinking back, I wish I had sought out more one-on-ones with them.
Unfortunately, the majority of my projects did not have much overlap with them.

I am leaving with a real appreciation for infrastructure as code, a lot more comfort and appreciation for PowerShell
(and scripting in general) than I ever expected to have, and a much better sense of what working at an established
company actually looks like, the good parts and the frustrating ones. I am already thinking about how I should be
managing my homelab with Terraform, and ways I could improve the deployment for some of my personal projects.

<br/>
<br/>

# Huge Thanks To My Team!

I really want to thank my whole team for having me the past eight months. I had a really awesome time with you guys. To
OT (Tyler Babury), I very much enjoyed the awesome conversations we had on literally every project I worked on. You
helped me explore all my ideas, and then some. Thanks for trusting me to actually give the Prospect rewrite a go, as
well as to play with Terragrunt for our infrastructure. You gave me a new appreciation for scripting, and I really
appreciated the awesome chats we had when I got stuck on some project. Also, thanks for teaching me Magic, I am still looking
forward to getting those Star Trek cards! Thanks to Chris Bitton for being an amazing manager! We did not have too many
technical chats, but I really looked forward to our one-on-ones, to show off my work to you, and to talk about camping
of course. Thanks, Jared Koiter, for helping me so much with all my Terraform and infrastructure questions. I really
appreciated how thorough you were in my code reviews, and how deeply you cared about your precious repos. Hope I did not
screw ’em up too much. Tyler Sennema, I very much enjoyed sneaking over to your desk around 4:45 for an end of day chat.
Your help and ideas were always superb. I wish we had got a project with a little more overlap, other than Azure
Monitor/Alerts, which I have developed your same hatred for. Ted Sontag, we obviously did not chat as much as the
in-office team, however, I did enjoy the occasional one-on-ones we had. Always appreciated your insight into what I was
working on, as well as your advice! Vijay Bhaskar, we also did not get much of an opportunity to chat one-on-one, which
I do regret, however, I really enjoyed hearing about your load testing efforts and watching you present the homebrew
tools you were building. I had not previously worked at a company big enough to bother load testing their products, so I
am really grateful I got to hear your presentations, and read some of your confluence reports. It was awesome having the
opportunity to work with you all. Thanks so much guys!
