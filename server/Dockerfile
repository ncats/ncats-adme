FROM continuumio/miniconda:latest

WORKDIR ./

COPY client/ ./
COPY images/ ./
COPY consensus_model.py ./
COPY environment.yml ./
COPY models.py ./
COPY settings.py ./
COPY startup.sh ./
COPY wsgi.py ./

RUN apt update
RUN apt install -y git
RUN git clone https://github.com/chemprop/chemprop.git
RUN chmod +x startup.sh
RUN conda env create -f environment.yml

RUN echo "source activate ncats-adme" > ~/.bashrc
ENV PATH /opt/conda/envs/ncats-adme/bin:$PATH

EXPOSE 5000

ENTRYPOINT ["./startup.sh"]
