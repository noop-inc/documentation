# Getting Started

![Noop Logo](assets/logo.png)

## Why Noop?
Noop is an **integrated** toolchain and platform to solve the challenges that stand between **developing** your code and **delivering** it. Our integrated approach stands alone in attempting to solve this broad set of challenges and crucially understands the **context** of you applications.

```mermaid
flowchart LR
    subgraph Your Team
    direction TB
    Code[Source\nCode]-->Repository & AppManifest
    end
    subgraph Noop 
    direction LR
    Repository-->Pipelines-->Build[Build & Deploy]-->Runtime[Runtime\nEnvironment]
    Diagnostics[Diagnostics &\nObservability]-->Runtime
    Diagnostics-->Local
    AppManifest-->Desktop-->Project-->Local[Local Development]
    end
    subgraph Your Users
    direction LR
    Runtime-. Traffic .-Client
    end
    classDef className stroke:#0091ff,stroke-width:5px;
    class Pipelines,Build,Runtime,Diagnostics,Desktop,Project,Local className;
    linkStyle 2,3,4,5,6,7,8,9 stroke:#0091ff,stroke-width:5px
    linkStyle 10 stroke:#0091ff,stroke-width:5px,stroke-dasharray: 5 5
```

## Why Not DevOps?
In DevOps, tools only attempt to address specific areas. This leaves the chalenge of selection, integration, and maintenance of each tool in the toolchain to the organizations trying to deliver software.
