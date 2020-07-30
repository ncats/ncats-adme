# ADME_RLM

To use this application, you can either use [Git](https://git-scm.com/) to clone the respository, or you can simply download a ZIP file (by clicking the green "Code" button on the top right corner) and then unzip it.

If you use Git to clone this repository, use the --recursive flag:

`git clone --recursive https://github.com/ncats/ADME_RLM.git`

## Install required software

1. Install [anaconda or miniconda](https://docs.conda.io/projects/continuumio-conda/en/latest/user-guide/install/index.html#)

Python is also required but it is included with either installation of conda or miniconda

## Setup environment

1. If you're on Windows, open Anaconda Prompt and skip to step 3
2. If you're on Mac or Linux, open your terminal
3. Change the working directory ([windows](https://www.digitalcitizen.life/command-prompt-how-use-basic-commands) or [Mac and Linux](https://www.geeksforgeeks.org/cd-command-in-linux-with-examples/)) to where you have ADME_RLM and then go into the server directory
4. Type `conda env create --prefix ./env -f environment.yml` and hit Enter
5. It will take several minutes to create the environment so be patient
6. Type `conda activate ./env` and hit Enter
7. Type `python app.py` and hit Enter
8. Open Chrome or Firefox and browse to `http://127.0.0.1:5000/`
9. Once you're done with the application, hit `Ctrl + c` or `Cmd + c` and then type `conda deactivate` and hit Enter
