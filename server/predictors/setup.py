from setuptools import setup, find_namespace_packages
from multiprocessing import set_start_method
set_start_method('forkserver')

setup(
    name='ncats-adme-predictors',
    version='1',
    author='Jorge Neyra, Vishal Babu Siramshetty, Sankalp Jain',
    author_email='jorge.neyra@nih.gov, vishalbabu.siramshetty@nih.gov, sankalp.jain@nih.gov',
    packages=find_namespace_packages(include=[
        'rlm.*',
        'cyp450.*'
        'features.*'
        'utilities.*'
    ]),
    zip_safe=False
)