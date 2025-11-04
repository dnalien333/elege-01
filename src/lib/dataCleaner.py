import pandas as pd
import json
import math
import os

# Caminho do CSV de origem
caminho_csv = r"C:\Repo\elege-01\src\data\votacoes2024\votacao_candidato_munzona_2024_BRASIL.csv"

# Caminho do arquivo JS de saída
nome_arquivo_saida = "mockElectionData.js"
caminho_saida = os.path.join(r"C:\Repo\elege-01\src\data\mocks", nome_arquivo_saida)

# Ler CSV
df = pd.read_csv(caminho_csv, sep=';', encoding='utf-8')
df.columns = df.columns.str.strip()

# Converter LATITUDE e LONGITUDE para float
def converter_float(val):
    try:
        return float(str(val).replace(',', '.'))
    except:
        return float('nan')

df['LATITUDE'] = df['LATITUDE'].apply(converter_float)
df['LONGITUDE'] = df['LONGITUDE'].apply(converter_float)

# Listas únicas de candidatos e partidos
candidates = sorted(df['NM_URNA_CANDIDATO'].dropna().unique())
parties = sorted(df['SG_PARTIDO'].dropna().unique())

# Agrupar dados por município
municipalities = []

for (uf, municipio), group in df.groupby(['SG_UF', 'NM_MUNICIPIO']):
    # ID do município: pode ser a soma dos códigos das zonas ou criar um hash simples
    id_mun = str(abs(hash(f"{uf}_{municipio}")) % 10**8)  # 8 dígitos
    
    latitude = group['LATITUDE'].iloc[0] if not math.isnan(group['LATITUDE'].iloc[0]) else 0
    longitude = group['LONGITUDE'].iloc[0] if not math.isnan(group['LONGITUDE'].iloc[0]) else 0
    
    total_voters = group['QT_VOTOS_NOMINAIS_VALIDOS'].sum()
    
    votes = []
    for (cand, party, turno), vote_group in group.groupby(['NM_URNA_CANDIDATO', 'SG_PARTIDO', 'NR_TURNO']):
        total_votes = vote_group['QT_VOTOS_NOMINAIS'].sum()
        percentage = round((total_votes / total_voters) * 100, 2) if total_voters > 0 else 0
        votes.append({
            "candidate": cand,
            "party": party,
            "turno": int(turno),
            "totalVotes": int(total_votes),
            "percentage": percentage
        })
    
    municipality_item = {
        "id": id_mun,
        "name": municipio,
        "state": uf,
        "coordinates": [latitude, longitude],
        "votes": votes,
        "totalVoters": int(total_voters)
    }
    
    municipalities.append(municipality_item)

# Gerar conteúdo do arquivo JS
js_content = ""

# candidates
js_content += "export const candidates = [\n"
js_content += ",\n".join([f'  "{c}"' for c in candidates])
js_content += "\n];\n\n"

# parties
js_content += "export const parties = ["
js_content += ", ".join([f'"{p}"' for p in parties])
js_content += "];\n\n"

# mockElectionData
js_content += "export const mockElectionData: MunicipalityData[] = "
js_content += json.dumps(municipalities, ensure_ascii=False, indent=2)
js_content += ";\n"

# Salvar arquivo
with open(caminho_saida, 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Arquivo gerado em:", caminho_saida)
