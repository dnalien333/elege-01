import pandas as pd
import json
import math

# Caminho do CSV corrigido
caminho_csv = r"C:\Repo\elege-01\src\data\votacoes2024\votacao_candidato_munzona_2024_BRASIL_modificado.csv"

# Ler CSV
df = pd.read_csv(caminho_csv, sep=';', encoding='utf-8')
df.columns = df.columns.str.strip()
