FROM continuumio/miniconda

ADD . .

RUN conda env create -f environment.yml

# Make RUN commands use the new environment:
SHELL ["conda", "run", "-n", "adme-env", "/bin/bash", "-c"]

COPY startup.sh /usr/local/bin/
	
RUN chmod u+x /usr/local/bin/startup.sh

ENTRYPOINT ["conda", "run", "-n", "adme-env", "python", "startup.sh"]