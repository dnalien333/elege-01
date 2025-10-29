import pandas as pd
import os
import json

csv_path = r"C:\Repo\elege-01\src\data\votacoes2024\votacao_candidato_munzona_2024_BRASIL.csv"

df = pd.read_csv(csv_path, sep=";", encoding="latin1", dtype=str)

df["QT_VOTOS_NOMINAIS"] = pd.to_numeric(df["QT_VOTOS_NOMINAIS"], errors="coerce").fillna(0).astype(int)

linhas_antes = len(df)

min_percent = 0.20

totais_municipio = df.groupby("NM_MUNICIPIO")["QT_VOTOS_NOMINAIS"].sum().rename("TOTAL_VOTOS_MUNICIPIO")

df = df.merge(totais_municipio, on="NM_MUNICIPIO", how="left")

# Participação percentual de cada candidato
df["PERCENTUAL_VOTOS"] = df["QT_VOTOS_NOMINAIS"] / df["TOTAL_VOTOS_MUNICIPIO"]

# Filtra candidatos relevantes
df_limpo = df[df["PERCENTUAL_VOTOS"] >= min_percent].copy()

# Corrige LATITUDE e LONGITUDE para formato decimal
def fix_coordinate(coord):
    if pd.isna(coord):
        return None
    coord = str(coord).replace('.', '', 1).replace('.', '')
    try:
        return float(coord) / 1000000
    except:
        return None

df_limpo["LATITUDE"] = df_limpo["LATITUDE"].apply(fix_coordinate)
df_limpo["LONGITUDE"] = df_limpo["LONGITUDE"].apply(fix_coordinate)

# Filtra coordenadas dentro dos limites do Brasil
df_limpo = df_limpo[
    df_limpo["LATITUDE"].between(-33.75, 5.27) &
    df_limpo["LONGITUDE"].between(-73.99, -34.79)
].copy()

df_limpo.drop(columns=["TOTAL_VOTOS_MUNICIPIO", "PERCENTUAL_VOTOS"], inplace=True)
df_limpo.to_csv(csv_path, sep=";", index=False, encoding="latin1")

print("\n✅ Limpeza concluída com sucesso!")
print(f"💾 Arquivo atualizado: {csv_path}")

# Caminho do arquivo JS de saída
output_path = r"C:\Repo\elege-01\src\data\mocks\votacaoMock.js"

# Converter colunas float que são inteiras
for col in df_limpo.columns:
    if df_limpo[col].dtype == float and (df_limpo[col] % 20 == 0).all():
        df_limpo[col] = df_limpo[col].astype(int)

# Converter para lista de dicionários
mock_data = df_limpo.to_dict(orient='records')

# Criar a pasta caso não exista
os.makedirs(os.path.dirname(output_path), exist_ok=True)

# Salvar o mock em formato JS 
with open(output_path, "w", encoding="utf-8") as f:
    f.write("export const votacaoMock = ")
    json.dump(mock_data, f, ensure_ascii=False, indent=2)

print(f"✅ Mock gerado com sucesso em: {output_path}")
print(f"🧩 Registros exportados: {len(mock_data)}")